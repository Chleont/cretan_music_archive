"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import AudioPlayer, { useAudioPlayer } from "react-modern-audio-player";

type PlayerLabels = {
  audioLabel: string;
  play: string;
  pause: string;
  seek: string;
  volume: string;
  mute: string;
  unmute: string;
  audioError: string;
};

function formatTime(seconds: number) {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

function PlayerControls({ labels }: { labels: PlayerLabels }) {
  const player = useAudioPlayer();
  const duration = Number.isFinite(player.duration) ? player.duration : 0;

  return (
    <div className="w-full min-w-0 px-1 py-2">
      <div className="mb-3 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{player.currentTrack?.name}</p>
          <p className="truncate text-xs text-shallow-grove">{player.currentTrack?.writer}</p>
        </div>
        <button type="button" onClick={player.toggleMute} aria-label={player.muted ? labels.unmute : labels.mute} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-sky-mist/50">
          {player.muted ? <VolumeX className="h-5 w-5" aria-hidden="true" /> : <Volume2 className="h-5 w-5" aria-hidden="true" />}
        </button>
        <input type="range" min={0} max={1} step={0.01} value={player.muted ? 0 : player.volume} onChange={(event) => {
          player.setVolume(Number(event.target.value));
          if (player.muted) player.toggleMute();
        }} aria-label={labels.volume} className="w-16 accent-olive-leaf sm:w-24" />
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={player.togglePlay} aria-label={player.isPlaying ? labels.pause : labels.play} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-deep-grove text-white hover:bg-olive-leaf">
          {player.isPlaying ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
        </button>
        <span className="text-xs tabular-nums">{formatTime(player.currentTime)}</span>
        <input type="range" min={0} max={duration || 1} step={0.1} value={Math.min(player.currentTime, duration)} disabled={!duration} onChange={(event) => player.seek(Number(event.target.value))} aria-label={labels.seek} aria-valuetext={`${formatTime(player.currentTime)} / ${formatTime(duration)}`} className="min-w-0 flex-1 accent-olive-leaf" />
        <span className="text-xs tabular-nums">{formatTime(duration)}</span>
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
        audioInitialState={{ curPlayId: 1, isPlaying: false, preload: "metadata", onError: () => setFailed(true), onLoadedMetadata: () => setFailed(false) }}
        activeUI={{ all: false, playButton: false }}
        placement={{ player: "static", interface: { customComponentsArea: { controls: "row1-1" } } }}
        colorScheme="light"
      >
        <AudioPlayer.CustomComponent id="controls" width="100%" padding={0}>
          <PlayerControls labels={labels} />
        </AudioPlayer.CustomComponent>
      </AudioPlayer>
      {failed && <p role="alert" className="px-3 pb-2 text-sm text-shallow-grove">{labels.audioError}</p>}
    </section>
  );
}
