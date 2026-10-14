import Link from "next/link";
import { ArrowLeft, Music2 } from "lucide-react";
import { getDictionary, getLocale } from "@/lib/translations";

export default async function TracksPage({ searchParams }: PageProps<"/tracks">) {
  const params = await searchParams;
  const locale = getLocale(params.lang);
  const dictionary = getDictionary(locale);
  const selectedTrack = Array.isArray(params.track) ? params.track[0] : params.track;
  const tracks = dictionary.musiciansPage.musicians.flatMap((musician) =>
    musician.tracks.map((track) => ({
      ...track,
      musician: musician.name,
    }))
  );
  const track = tracks.find((item) => item.id === selectedTrack) ?? tracks[0];

  return (
    <main className="flex min-h-screen items-center justify-center bg-archive-ivory px-4 py-20 text-deep-grove">
      <section className="w-full max-w-2xl rounded-lg border border-deep-grove/15 bg-white/65 p-6 shadow-xl shadow-archive-black/10 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-cretan-slate">
          {dictionary.tracksPage.title}
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight">
          {dictionary.tracksPage.selectedLabel}
        </h1>
        <div className="mt-6 rounded-md bg-deep-grove p-5 text-archive-ivory">
          <Music2 className="h-7 w-7 text-sun-ochre" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-bold">{track.title}</h2>
          <p className="mt-2 text-archive-ivory/75">
            {track.musician} · {track.area} · {track.duration}
          </p>
        </div>
        <p className="mt-5 leading-7 text-shallow-grove">
          {dictionary.tracksPage.intro}
        </p>
        <Link
          href={{
            pathname: "/musicians",
            query: locale === "en" ? { lang: "en" } : {},
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-deep-grove px-4 py-2 text-sm font-bold text-archive-ivory transition-colors hover:bg-olive-leaf"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {dictionary.tracksPage.backToMusicians}
        </Link>
      </section>
    </main>
  );
}
