"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { getDictionary, getLocale } from "@/lib/translations";
import { cn } from "@/lib/utils";

// The player library reads window.innerWidth during its initial render.
const TrackAudioPlayer = dynamic(() => import("@/components/tracks/audio-player"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="h-20 md:h-10" />,
});

export default function TrackContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const trackMenu = useRef<HTMLDialogElement>(null);
  const trackMenuId = useId();
  const [trackMenuOpen, setTrackMenuOpen] = useState(false);
  const locale = getLocale(searchParams.get("lang") ?? undefined);
  const dictionary = getDictionary(locale);
  const page = dictionary.tracksPage;
  const tracks = dictionary.musiciansPage.musicians.flatMap((musician) =>
    musician.tracks.map((track) => ({ ...track, artist: musician.name, musicianId: musician.id, image: musician.avatar, imageAlt: musician.imageAlt }))
  );
  const selected = tracks.find((track) => track.id === id);
  const collator = new Intl.Collator(locale, { sensitivity: "base" });
  const hrefFor = (trackId?: string) =>
    `${trackId ? `/tracks/${encodeURIComponent(trackId)}` : "/tracks"}${locale === "en" ? "?lang=en" : ""}`;

  if (!selected) return null;

  const artistTracks = tracks.filter((track) => track.musicianId === selected.musicianId).sort((a, b) => collator.compare(a.title, b.title));

  return (
    <main className="min-h-screen bg-track-background pt-24 text-track-ink lg:grid lg:h-dvh lg:min-h-0 lg:grid-rows-[minmax(0,1fr)_auto]">
      <section className="mx-auto grid w-full pb-32 lg:min-h-0 lg:pb-4 lg:max-w-full md:max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden lg:px-10">
        <aside className="flex min-h-0 min-w-0 flex-col gap-4 lg:overflow-y-auto">
          <div className="lg:hidden">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={trackMenuOpen}
              aria-controls={trackMenuId}
              className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-md bg-olive-leafy/50 px-3 py-3 text-left text-sm font-bold text-olive-leaf-dark hover:bg-olive-leafy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-leaf"
              onClick={() => {
                trackMenu.current?.showModal();
                setTrackMenuOpen(true);
              }}
            >
              {page.menuLabel}
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            <dialog
              ref={trackMenu}
              id={trackMenuId}
              aria-labelledby={`${trackMenuId}-title`}
              onClose={() => setTrackMenuOpen(false)}
              className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overscroll-none border-0 bg-white p-0 text-olive-leaf-dark open:flex open:flex-col backdrop:bg-white"
            >
              <header className="flex shrink-0 items-center justify-between gap-4 bg-olive-leafy/50 px-6 py-4">
                <h2 id={`${trackMenuId}-title`} className="text-lg font-bold">{page.menuLabel}</h2>
                <button type="button" autoFocus aria-label={dictionary.common.closeNavigation} onClick={() => trackMenu.current?.close()} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-olive-leafy focus-visible:outline-2 focus-visible:outline-olive-leaf">
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </header>
              <nav aria-label={page.menuLabel} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                {dictionary.musiciansPage.musicians.map((musician) => (
                  <section key={musician.id} className="py-6">
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-olive-leaf">{musician.name}</h3>
                    {musician.tracks.map((track) => (
                      <Link key={track.id} href={hrefFor(track.id)} scroll={false} onClick={() => trackMenu.current?.close()} aria-current={track.id === selected.id ? "page" : undefined} className={cn("flex items-center justify-between gap-4 rounded-md px-3 py-4 font-bold hover:bg-olive-leaf-light focus-visible:outline-2 focus-visible:outline-olive-leaf", track.id === selected.id && "bg-olive-leafy")}>
                        <span>{track.title}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    ))}
                  </section>
                ))}
              </nav>
            </dialog>
          </div>
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl text-olive-leaf-dark">{selected.title}</h1>
            <p className="mt-3 text-olive-leaf-dark text-xl">{selected.artist}</p>
          </div>
          <iframe key={selected.id} src={selected.youtubeUrl} title={`${page.youtubeLabel}: ${selected.title}`} className="aspect-video w-full rounded-md bg-track-surface" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          <nav aria-label={page.artistTracks} className="hidden lg:block">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-olive-leaf-dark">{page.artistTracks}</h2>
            {artistTracks.map((track) => (
              <Link key={track.id} href={hrefFor(track.id)} scroll={false} aria-current={track.id === selected.id ? "page" : undefined} className={cn("text-olive-leaf-dark group flex items-center justify-between gap-3 py-3 font-bold hover:text-olive-forest", track.id !== selected.id && "text-olive-leaf-dark/65")}>
                <span>{track.title}</span><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </aside>
        <article className="flex min-h-0 min-w-0 flex-col">
          <div className="min-h-0 flex-1 overflow-hidden rounded-md bg-track-background">
            <iframe src={`/sheets/${selected.sheetFile}`} title={`${page.sheetLabel}: ${selected.title}`} className="block h-[600px] w-full lg:h-full" />
          </div>
        </article>
      </section>
      <div className="track-player-dock lg:relative!">
        <TrackAudioPlayer key={`${selected.id}-${locale}`} track={selected} labels={page} />
      </div>
    </main>
  );
}
