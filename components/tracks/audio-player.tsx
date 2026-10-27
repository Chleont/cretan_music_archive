"use client";

import { ChevronUp, Gauge, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type RefObject } from "react";
import AudioPlayer, { useAudioPlayer } from "react-modern-audio-player";
import type { YouTubePlayer } from "react-youtube";

export type RecordingSource = "original" | "new";
type SourceProps = {
  source: RecordingSource;
  onSourceChange: (source: RecordingSource) => void;
  youtubePlayer: YouTubePlayer | null;
  youtubeFailed: boolean;
};

type PlayerLabels = {
  audioLabel: string;
  play: string;
  pause: string;
  seek: string;
  skipBackward: string;
  skipForward: string;
  playbackSpeed: string;
  audioError: string;
  recordingSource: string;
  originalRecording: string;
  newRecording: string;
  youtubeError: string;
};

function formatTime(seconds: number) {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

function PlayerControls({ labels, audioRef, source, onSourceChange, youtubePlayer, youtubeFailed }: { labels: PlayerLabels; audioRef: RefObject<HTMLAudioElement | null> } & SourceProps) {
  const audio = useAudioPlayer();
  const audioDuration = useSyncExternalStore(
    useCallback((notify) => {
      const element = audioRef.current;
      if (!element) return () => {};
      const events = ["loadedmetadata", "durationchange", "emptied"];
      events.forEach((event) => element.addEventListener(event, notify));
      return () => events.forEach((event) => element.removeEventListener(event, notify));
    }, [audioRef]),
    useCallback(() => {
      const duration = audioRef.current?.duration;
      return duration !== undefined && Number.isFinite(duration) && duration > 0 ? duration : 0;
    }, [audioRef]),
    () => 0,
  );
  const { pause: pauseAudio } = audio;
  const [youtube, setYoutube] = useState({ duration: 0, currentTime: 0, isPlaying: false, playbackRate: 1, rates: [1] });
  const original = source === "original";

  useEffect(() => {
    if (original) pauseAudio();
    else if (youtubePlayer) void youtubePlayer.pauseVideo().catch(() => {});
  }, [original, youtubePlayer, pauseAudio]);

  useEffect(() => {
    if (!youtubePlayer || !original || youtubeFailed) return;
    let cancelled = false;
    let pending = false;
    const sync = async () => {
      if (pending) return;
      pending = true;
      try {
        const [duration, currentTime, state, playbackRate, rates] = await Promise.all([
          youtubePlayer.getDuration(), youtubePlayer.getCurrentTime(), youtubePlayer.getPlayerState(),
          youtubePlayer.getPlaybackRate(), youtubePlayer.getAvailablePlaybackRates(),
        ]);
        if (!cancelled) setYoutube({ duration, currentTime, isPlaying: state === 1, playbackRate, rates: rates.length ? rates : [1] });
      } catch {
        // The iframe can be destroyed while navigating to another track.
      } finally {
        pending = false;
      }
    };
    void sync();
    const timer = window.setInterval(() => void sync(), 250);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, [original, youtubePlayer, youtubeFailed]);

  const player = original ? {
    ...youtube,
    duration: youtubePlayer && !youtubeFailed ? youtube.duration : 0,
    seek: (time: number) => {
      void youtubePlayer?.seekTo(time, true).catch(() => {});
      setYoutube((previous) => ({ ...previous, currentTime: time }));
    },
    togglePlay: () => {
      if (!youtubePlayer || youtubeFailed) return;
      void (youtube.isPlaying ? youtubePlayer.pauseVideo() : youtubePlayer.playVideo()).catch(() => {});
    },
    setPlaybackRate: (rate: number) => { void youtubePlayer?.setPlaybackRate(rate).catch(() => {}); },
  } : { ...audio, duration: audioDuration || audio.duration };
  const duration = Number.isFinite(player.duration) ? player.duration : 0;
  const currentTime = Math.max(0, Math.min(player.currentTime, duration));
  const [speedOpen, setSpeedOpen] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const sourceButton = useRef<HTMLButtonElement>(null);
  const sourceId = useId();
  const speedId = useId();
  const rateIndex = Math.max(0, youtube.rates.indexOf(youtube.playbackRate));
  const speedValue = original ? rateIndex : player.playbackRate;
  const speedMax = original ? Math.max(1, youtube.rates.length - 1) : 2;
  const speedProgress = original ? (rateIndex / speedMax) * 100 : ((player.playbackRate - 0.5) / 1.5) * 100;
  const speedText = original ? String(player.playbackRate) : player.playbackRate.toFixed(1);
  const buttonClass = "flex h-10 w-10 cursor-pointer items-center justify-center justify-self-center rounded-full hover:bg-track-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-track-accent";

  return (
      <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_2.5rem_2.5rem_2.5rem_minmax(0,1fr)] items-center gap-x-2 gap-y-0 md:grid-cols-[auto_auto_auto_auto_auto_minmax(0,1fr)_auto] md:gap-x-3">
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
              <input
                id={`${speedId}-range`}
                type="range"
                min={original ? 0 : 0.5}
                max={speedMax}
                step={original ? 1 : 0.05}
                value={speedValue}
                disabled={original && (!youtubePlayer || youtubeFailed || youtube.rates.length < 2)}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  player.setPlaybackRate(original ? youtube.rates[value] : value);
                }}
                aria-orientation="vertical"
                aria-valuetext={`${speedText}×`}
                style={{ "--slider-progress": `${speedProgress}%` } as CSSProperties}
                className="track-player-range track-speed-range block h-32 w-6 cursor-pointer disabled:cursor-default disabled:opacity-40"
              />
              <output htmlFor={`${speedId}-range`} className="mt-1 block text-xs">{speedText}</output>
            </div>
          </div>
        </div>
        <div
          className="relative col-start-1 row-start-3 justify-self-start md:col-start-5 md:row-start-1 md:justify-self-center"
          onPointerEnter={(event) => { if (event.pointerType === "mouse") setSourceOpen(true); }}
          onPointerLeave={(event) => { if (event.pointerType === "mouse") setSourceOpen(false); }}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSourceOpen(false); }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setSourceOpen(false);
              sourceButton.current?.focus();
            }
          }}
        >
          <button ref={sourceButton} type="button" aria-expanded={sourceOpen} aria-controls={sourceId} onClick={() => setSourceOpen(!sourceOpen)} className="font-semibold flex h-10 cursor-pointer items-center gap-2 rounded-full px-3 text-sm hover:bg-track-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-track-accent">
            <span className="font-bold">{labels.recordingSource}</span>
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          </button>
          <div id={sourceId} hidden={!sourceOpen} className="absolute bottom-full left-0 z-10 w-max min-w-40 pb-3">
            <div role="group" aria-label={labels.recordingSource} className="flex flex-col gap-1 rounded-md bg-track-background p-2 text-sm text-track-ink shadow-lg">
              {(["original", "new"] as const).map((option) => (
                <button key={option} type="button" aria-pressed={source === option} onClick={() => { onSourceChange(option); setSourceOpen(false); sourceButton.current?.focus(); }} className="track-source-option cursor-pointer rounded-md text-left focus-visible:outline-2 focus-visible:outline-track-accent">
                  <span>{option === "original" ? labels.originalRecording : labels.newRecording}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <input type="range" min={0} max={duration || 1} step={0.1} value={currentTime} disabled={!duration} onChange={(event) => player.seek(Number(event.target.value))} style={{ "--slider-progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as CSSProperties} aria-label={labels.seek} aria-valuetext={`${formatTime(currentTime)} / ${formatTime(duration)}`} className="track-player-range col-span-5 col-start-1 row-start-1 h-6 w-full min-w-0 cursor-pointer md:col-span-1 md:col-start-6" />
        <button type="button" disabled={original && (!youtubePlayer || youtubeFailed)} onClick={player.togglePlay} aria-label={player.isPlaying ? labels.pause : labels.play} className={`${buttonClass} col-start-3 row-start-3 bg-track-highlight text-track-accent hover:bg-track-highlight disabled:opacity-40 md:col-start-2 md:row-start-1`}>
          {player.isPlaying ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
        </button>
        <div className="col-span-5 col-start-1 row-start-2 flex justify-between text-xs tabular-nums md:col-span-1 md:col-start-7 md:row-start-1 md:gap-1">
          <span>{formatTime(currentTime)}</span>
          <span aria-hidden="true" className="hidden md:inline">/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
  );
}

export default function TrackAudioPlayer({ track, labels, ...sourceProps }: {
  track: { title: string; artist: string; audioFile: string };
  labels: PlayerLabels;
} & SourceProps) {
  const [failed, setFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null!);

  return (
    <section aria-label={labels.audioLabel} className="track-audio-player">
      <AudioPlayer
        audioRef={audioRef}
        playList={[{ id: 1, name: track.title, writer: track.artist, src: `/tracks/${track.audioFile}` }]}
        audioInitialState={{
          curPlayId: 1, isPlaying: false, volume: 1, muted: false, preload: "metadata",
          onError: () => setFailed(true),
          onLoadedMetadata: () => setFailed(false),
        }}
        activeUI={{ all: false, playButton: false }}
        placement={{ player: "static", interface: { customComponentsArea: { controls: "row1-1" } } }}
        colorScheme="light"
      >
        <AudioPlayer.CustomComponent id="controls" width="100%" padding={0}>
          <PlayerControls labels={labels} audioRef={audioRef} {...sourceProps} />
        </AudioPlayer.CustomComponent>
      </AudioPlayer>
      {sourceProps.source === "new" && failed && <p role="alert" className="px-3 pb-2 text-sm text-track-ink/65">{labels.audioError}</p>}
      {sourceProps.source === "original" && sourceProps.youtubeFailed && <p role="alert" className="px-3 pb-2 text-sm text-track-ink/65">{labels.youtubeError}</p>}
    </section>
  );
}
