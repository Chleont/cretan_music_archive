"use client";

import { Gauge, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { useId, useState, type CSSProperties } from "react";
import AudioPlayer, { useAudioPlayer } from "react-modern-audio-player";

type PlayerLabels = {
  audioLabel: string;
  play: string;
  pause: string;
  seek: string;
  skipBackward: string;
  skipForward: string;
  playbackSpeed: string;
  audioError: string;
};

function formatTime(seconds: number) {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

function PlayerControls({ labels }: { labels: PlayerLabels }) {
  const player = useAudioPlayer();
  const duration = Number.isFinite(player.duration) ? player.duration : 0;
  const currentTime = Math.max(0, Math.min(player.currentTime, duration));
  const [speedOpen, setSpeedOpen] = useState(false);
  const speedId = useId();
  const buttonClass = "flex h-10 w-10 cursor-pointer items-center justify-center justify-self-center rounded-full hover:bg-track-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-track-accent";

  return (
    <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_2.5rem_2.5rem_2.5rem_minmax(0,1fr)] items-center gap-x-2 gap-y-0 md:grid-cols-[auto_auto_auto_auto_minmax(0,1fr)_auto] md:gap-x-3">
      <button type="button" disabled={!duration} onClick={() => player.seek(Math.max(0, currentTime - 5))} aria-label={labels.skipBackward} className={`${buttonClass} relative col-start-2 row-start-3 disabled:opacity-40 md:col-start-1 md:row-start-1`}>
        <RotateCcw className="h-6 w-6" aria-hidden="true" />
        <span aria-hidden="true" className="absolute text-[9px] font-bold">5</span>
      </button>
      <button type="button" disabled={!duration} onClick={() => player.seek(Math.min(duration, currentTime + 5))} aria-label={labels.skipForward} className={`${buttonClass} relative col-start-4 row-start-3 disabled:opacity-40 md:col-start-3 md:row-start-1`}>
        <RotateCw className="h-6 w-6" aria-hidden="true" />
        <span aria-hidden="true" className="absolute text-[9px] font-bold">5</span>
      </button>
      <div
        className="relative col-start-5 row-start-3 justify-self-end md:col-start-4 md:row-start-1 md:justify-self-center"
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setSpeedOpen(true); }}
        onPointerLeave={(event) => { if (event.pointerType === "mouse") setSpeedOpen(false); }}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSpeedOpen(false); }}
        onKeyDown={(event) => { if (event.key === "Escape") setSpeedOpen(false); }}
      >
        <button type="button" aria-label={labels.playbackSpeed} aria-expanded={speedOpen} aria-controls={speedId} onClick={() => setSpeedOpen(!speedOpen)} className={buttonClass}>
          <Gauge className="h-5 w-5" aria-hidden="true" />
        </button>
        <div id={speedId} hidden={!speedOpen} className="absolute bottom-full right-0 z-10 w-20 pb-3 md:right-auto md:left-0">
          <div className="flex flex-col items-center rounded-md bg-track-background px-4 py-3 text-center text-track-ink shadow-lg">
            <label htmlFor={`${speedId}-range`} className="sr-only">{labels.playbackSpeed}</label>
            <input id={`${speedId}-range`} type="range" min={0.5} max={2} step={0.05} value={player.playbackRate} onChange={(event) => player.setPlaybackRate(Number(event.target.value))} aria-orientation="vertical" aria-valuetext={player.playbackRate.toFixed(1)} style={{ "--slider-progress": `${((player.playbackRate - 0.5) / 1.5) * 100}%` } as CSSProperties} className="track-player-range track-speed-range block h-32 w-6 cursor-pointer" />
            <output htmlFor={`${speedId}-range`} className="mt-1 block text-xs">{player.playbackRate.toFixed(1)}</output>
          </div>
        </div>
      </div>
      <input type="range" min={0} max={duration || 1} step={0.1} value={currentTime} disabled={!duration} onChange={(event) => player.seek(Number(event.target.value))} style={{ "--slider-progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as CSSProperties} aria-label={labels.seek} aria-valuetext={`${formatTime(currentTime)} / ${formatTime(duration)}`} className="track-player-range col-span-5 col-start-1 row-start-1 h-6 w-full min-w-0 cursor-pointer md:col-span-1 md:col-start-5" />
      <button type="button" onClick={player.togglePlay} aria-label={player.isPlaying ? labels.pause : labels.play} className={`${buttonClass} col-start-3 row-start-3 bg-track-highlight text-track-accent hover:bg-track-highlight md:col-start-2 md:row-start-1`}>
        {player.isPlaying ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
      </button>
      <div className="col-span-5 col-start-1 row-start-2 flex justify-between text-xs tabular-nums md:col-span-1 md:col-start-6 md:row-start-1 md:gap-1">
        <span>{formatTime(currentTime)}</span>
        <span aria-hidden="true" className="hidden md:inline">/</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default function TrackAudioPlayer({ track, labels }: {
  track: { title: string; artist: string; audioFile: string };
  labels: PlayerLabels;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <section aria-label={labels.audioLabel} className="track-audio-player">
      <AudioPlayer
        playList={[{ id: 1, name: track.title, writer: track.artist, src: `/tracks/${track.audioFile}` }]}
        audioInitialState={{ curPlayId: 1, isPlaying: false, volume: 1, muted: false, preload: "metadata", onError: () => setFailed(true), onLoadedMetadata: () => setFailed(false) }}
        activeUI={{ all: false, playButton: false }}
        placement={{ player: "static", interface: { customComponentsArea: { controls: "row1-1" } } }}
        colorScheme="light"
      >
        <AudioPlayer.CustomComponent id="controls" width="100%" padding={0}>
          <PlayerControls labels={labels} />
        </AudioPlayer.CustomComponent>
      </AudioPlayer>
      {failed && <p role="alert" className="px-3 pb-2 text-sm text-track-ink/65">{labels.audioError}</p>}
    </section>
  );
}
