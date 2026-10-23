"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getDictionary, getLocale } from "@/lib/translations";
import { cn } from "@/lib/utils";

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
  const collator = new Intl.Collator(locale, { sensitivity: "base" });
  const sortedTracks = [...tracks].sort((a, b) => {
    const comparison = sort.key === "year" ? a.year - b.year : collator.compare(a[sort.key], b[sort.key]);
    return comparison * (sort.descending ? -1 : 1) || collator.compare(a.title, b.title);
  });
  const hrefFor = (id: string) =>
    `/tracks/${encodeURIComponent(id)}${locale === "en" ? "?lang=en" : ""}`;

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

  return (
    <main className="min-h-screen bg-white text-deep-grove">
      <section className="mx-auto w-full lg:max-w-[90vw] md:max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-10">
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
                  router.push(hrefFor(track.id));
                }} className="cursor-pointer [&>*]:transition-colors hover:[&>*]:bg-olive-leaf/10">
                  <td className={`${index==0?"rounded-bl-lg":"rounded-l-lg"} p-4`}><Image src={track.image} alt={track.imageAlt} width={48} height={48} className="w-12 aspect-square object-cover rounded-full" /></td>
                  <th scope="row" className={`${index==0?"rounded-br-lg":"rounded-r-lg"} px-4 py-5 font-bold md:rounded-r-none`}><Link href={hrefFor(track.id)}>{track.title}</Link></th>
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
