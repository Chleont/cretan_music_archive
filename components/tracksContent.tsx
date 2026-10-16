"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getDictionary, getLocale } from "@/lib/translations";
import { cn } from "@/lib/utils";
import TrackAudioPlayer from "@/components/tracks/audio-player";

type SortKey = "title" | "artist" | "year";

export default function TracksContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = getLocale(searchParams.get("lang") ?? undefined);
  const dictionary = getDictionary(locale);
  const page = dictionary.tracksPage;
  const [sort, setSort] = useState<{ key: SortKey; descending: boolean }>({ key: "title", descending: false });
  const tracks = dictionary.musiciansPage.musicians.flatMap((musician) =>
    musician.tracks.map((track) => ({ ...track, artist: musician.name, musicianId: musician.id, image: musician.avatar, imageAlt: musician.imageAlt }))
  );
  const selectedId = searchParams.get("track");
  const selected = tracks.find((track) => track.id === selectedId);
  const collator = new Intl.Collator(locale, { sensitivity: "base" });
  const sortedTracks = [...tracks].sort((a, b) => {
    const comparison = sort.key === "year" ? a.year - b.year : collator.compare(a[sort.key], b[sort.key]);
    return comparison * (sort.descending ? -1 : 1) || collator.compare(a.title, b.title);
  });
  const hrefFor = (id?: string) => {
    const params = new URLSearchParams({ ...(locale === "en" ? { lang: "en" } : {}), ...(id ? { track: id } : {}) });
    const query = params.toString();
    return query ? `/tracks?${query}` : "/tracks";
  };

  function sortHeading(key: SortKey, label: string) {
    const Icon = sort.key === key && !sort.descending ? ChevronUp : ChevronDown;
    return (
      <th scope={key === "title" ? "colgroup" : "col"} colSpan={key === "title" ? 2 : 1} className={cn("px-4 py-4", key !== "title" && "hidden md:table-cell")} aria-sort={sort.key === key ? (sort.descending ? "descending" : "ascending") : "none"}>
        <button type="button" className="inline-flex cursor-pointer items-center gap-2 text-left hover:text-olive-forest focus-visible:outline-2 focus-visible:outline-offset-4" onClick={() => setSort({ key, descending: sort.key === key && !sort.descending })}>
          {label}<Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </th>
    );
  }

  if (!selected) {
    return (
      <main className="min-h-screen bg-white text-deep-grove">
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-10">
          <h1 className="text-5xl font-bold sm:text-7xl">{page.title}</h1>
          <div className="mt-8 overflow-x-auto rounded-md">
            <table className="w-full table-fixed border-separate border-spacing-0 text-left text-sm md:min-w-[760px] md:table-auto">
              <caption className="sr-only">{page.title}</caption>
              <colgroup>
                <col className="w-20" />
                <col />
                <col span={4} className="hidden md:table-column" />
              </colgroup>
              <thead className="bg-olive-leaf-light font-bold">
                <tr>
                  {sortHeading("title", page.trackName)}
                  <th scope="col" className="hidden px-4 py-4 md:table-cell">{page.duration}</th>
                  {sortHeading("artist", page.artist)}
                  <th scope="col" className="hidden px-4 py-4 md:table-cell">{page.location}</th>
                  {sortHeading("year", page.year)}
                </tr>
              </thead>
              <tbody>
                {sortedTracks.map((track,index) => (
                  <tr key={track.id} onClick={(event) => {
                    if (event.defaultPrevented || (event.target as Element).closest("a")) return;
                    router.push(`/tracks?track=${track.id}`);
                  }} className="cursor-pointer [&>*]:transition-colors hover:[&>*]:bg-olive-leaf/10">
                    <td className={`${index==0?"rounded-bl-lg":"rounded-l-lg"} p-4`}><Image src={track.image} alt={track.imageAlt} width={48} height={48} className="h-12 w-12 object-cover" /></td>
                    <th scope="row" className={`${index==0?"rounded-br-lg":"rounded-r-lg"} px-4 py-5 font-bold md:rounded-r-none`}>{track.title}</th>
                    <td className="hidden px-4 py-5 tabular-nums md:table-cell">{track.duration}</td>
                    <td className="hidden px-4 py-5 md:table-cell">{track.artist}</td>
                    <td className="hidden px-4 py-5 md:table-cell">{track.area}</td>
                    <td className={`hidden ${index==0?"rounded-br-lg":"rounded-r-lg"} px-4 py-5 tabular-nums md:table-cell text-center`}>{track.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    );
  }

  const artistTracks = tracks.filter((track) => track.musicianId === selected.musicianId).sort((a, b) => collator.compare(a.title, b.title));

  return (
    <main className="min-h-screen bg-white text-deep-grove">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl gap-8 px-4 pb-44 pt-24 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-10">
        <aside className="flex min-w-0 flex-col gap-4">
          <div className="lg:hidden">
            <label htmlFor="track-select" className="mb-2 block text-sm font-bold">{page.menuLabel}</label>
            <select id="track-select" value={selected.id} className="w-full rounded-md bg-white px-3 py-3 font-bold" onChange={(event) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("track", event.target.value);
              router.push(`/tracks?${params.toString()}`, { scroll: false });
            }}>
              {dictionary.musiciansPage.musicians.map((musician) => (
                <optgroup key={musician.id} label={musician.name}>
                  {musician.tracks.map((track) => <option key={track.id} value={track.id}>{track.title}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{selected.title}</h1>
            <p className="mt-3 text-shallow-grove">{selected.artist}</p>
          </div>
          <iframe key={selected.id} src={selected.youtubeUrl} title={`${page.youtubeLabel}: ${selected.title}`} className="aspect-video w-full rounded-md bg-archive-ivory" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          <nav aria-label={page.artistTracks} className="hidden lg:block">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-cretan-slate">{page.artistTracks}</h2>
            {artistTracks.map((track) => (
              <Link key={track.id} href={hrefFor(track.id)} scroll={false} aria-current={track.id === selected.id ? "page" : undefined} className={cn("group flex items-center justify-between gap-3 py-3 font-bold hover:text-olive-leaf", track.id !== selected.id && "text-shallow-grove")}>
                <span>{track.title}</span><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <Link href={hrefFor()} className="inline-flex items-center gap-2 py-2 text-sm font-bold text-olive-leaf"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{page.allTracks}</Link>
        </aside>
        <article className="min-w-0">
          <div className="flex min-h-[1000px] items-start justify-center rounded-md bg-archive-ivory/50 p-8 text-center text-shallow-grove">{page.sheetPlaceholder}</div>
          <div className="track-player-dock">
            <TrackAudioPlayer key={`${selected.id}-${locale}`} track={selected} labels={page} />
          </div>
        </article>
      </section>
    </main>
  );
}
