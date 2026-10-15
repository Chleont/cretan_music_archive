
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ArtistsDropdown } from "@/components/musicians/artists-dropdown";
import { cn } from "@/lib/utils";
import { getDictionary, getLocale } from "@/lib/translations";

export default function MusiciansContent() {
  const searchParams = useSearchParams();
  const locale = getLocale(searchParams.get("lang") ?? undefined);
  const dictionary = getDictionary(locale);

  const page = dictionary.musiciansPage;

  const selectedId = searchParams.get("musician");

  const selected =
    page.musicians.find((musician) => musician.id === selectedId) ??
    page.musicians[0];

  const artistOptions = page.musicians.map((musician) => ({
    id: musician.id,
    name: musician.name,
  }));

  return (
    <main className="min-h-screen bg-white text-deep-grove">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl gap-8 px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-10">
        <aside className="flex flex-col gap-4">
          <div className="lg:hidden">
            <ArtistsDropdown
              artists={artistOptions}
              selectedId={selected.id}
              ariaLabel={dictionary.common.artistSelectLabel}
            />
          </div>

          <div className="relative h-[360px] w-full overflow-hidden rounded-md bg-sky-mist sm:h-[420px] lg:h-[460px]">
            <Image
              src={selected.image}
              // TODO: fix alts
              alt={selected.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 320px, 100vw"
              className="object-cover"
            />
          </div>

          <nav aria-label={page.menuLabel} className="hidden gap-1 lg:grid">
            {page.musicians.map((musician) => (
              <Link
                key={musician.id}
                href={{
                  pathname: "/musicians",
                  query: {
                    ...(locale === "en" ? { lang: "en" } : {}),
                    musician: musician.id,
                  },
                }}
                className={cn(
                  "group flex items-center justify-between border-b border-deep-grove/15 py-3 text-left font-bold transition-colors",
                  selected.id === musician.id
                    ? "text-deep-grove"
                    : "text-shallow-grove hover:text-deep-grove"
                )}
                aria-current={selected.id === musician.id ? "page" : undefined}
              >
                <span>{musician.name}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>
        </aside>

        <article className="flex min-w-0 flex-col gap-8">
          <section className="flex flex-col gap-6">
            <div>
              <h1 className="text-5xl font-bold leading-none text-deep-grove sm:text-7xl">
                {selected.name}
              </h1>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-shallow-grove">
                <span className="inline-flex items-center gap-2">
                  <MapPin
                    className="h-4 w-4 text-olive-leaf"
                    aria-hidden="true"
                  />
                  {page.bornLabel}: {selected.place}
                </span>
              </div>
            </div>

            <p className="max-w-4xl text-base leading-8 text-shallow-grove">
              {selected.biography}
            </p>
          </section>

          <section className="border-t border-deep-grove/15 pt-6">
            <Link
              href={selected.interviewHref}
              className="inline-flex w-fit items-center gap-2 rounded-md bg-deep-grove px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-olive-leaf"
            >
              {page.testimoniesCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <section className="border-t border-deep-grove/15 pt-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-cretan-slate">
              {page.tracksLabel}
            </h2>
            <div className="mt-3 grid gap-2">
              {selected.tracks.map((track) => (
                <Link
                  key={track.id}
                  href={{
                    pathname: "/tracks",
                    query: {
                      ...(locale === "en" ? { lang: "en" } : {}),
                      track: track.id,
                    },
                  }}
                  className="group grid gap-2 border-b border-deep-grove/15 py-3 transition-colors hover:border-sun-ochre sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <span>
                    <span className="block font-bold text-deep-grove">
                      {track.title}
                    </span>
                    <span className="text-sm text-shallow-grove">
                      {track.area}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-3 text-sm font-bold text-olive-leaf">
                    {track.duration}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}