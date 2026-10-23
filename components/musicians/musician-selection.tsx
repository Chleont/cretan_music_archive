"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MusiciansContent from "@/components/musicians/musiciansContent";
import { getDictionary, getLocale } from "@/lib/translations";

export default function MusicianSelection() {
  const searchParams = useSearchParams();
  const locale = getLocale(searchParams.get("lang") ?? undefined);
  const { musiciansPage: page } = getDictionary(locale);

  return (
    <div className="relative isolate min-h-svh bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-15 blur-[1px]" aria-hidden="true" inert>
        <MusiciansContent id={page.musicians[0].id} />
      </div>

      <main className="relative z-10 flex min-h-svh items-center justify-center bg-white/40 px-6 pb-12 pt-28 sm:px-10">
        <h1 className="sr-only">{page.menuLabel}</h1>
        <nav aria-label={page.menuLabel} className="grid w-full max-w-4xl grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 sm:gap-20 lg:gap-32">
          {page.musicians.map((musician) => (
            <Link
              key={musician.id}
              href={{
                pathname: `/musicians/${encodeURIComponent(musician.id)}`,
                query: locale === "en" ? { lang: "en" } : {},
              }}
              className="group w-full max-w-80 rounded-md text-center focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-olive-leaf"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-sky-mist shadow-lg transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none sm:rounded-full">
                <Image
                  src={musician.image}
                  alt={musician.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) calc((100vw - 160px) / 2), (min-width: 368px) 320px, calc(100vw - 48px)"
                  className="object-cover object-top"
                />
              </div>
              <span className="mt-5 text-archive-black block text-xl font-bold transition-colors group-hover:text-deep-grove sm:text-3xl">
                {musician.name}
              </span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
