"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getDictionary, getLocale } from "@/lib/translations";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeLanguage = searchParams.get("lang") === "en" ? "en" : "el";
  const nextLanguage = activeLanguage === "en" ? "el" : "en";
  const dictionary = getDictionary(getLocale(searchParams.get("lang") ?? undefined));

  function hrefFor() {
    const params = new URLSearchParams(searchParams.toString());

    if (nextLanguage === "el") {
      params.delete("lang");
    } else {
      params.set("lang", nextLanguage);
    }

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }

  return (
    <Link
      href={hrefFor()}
      className="pointer-events-auto absolute right-4 top-4 z-[60] rounded-md px-3 py-2 text-sm font-bold text-deep-grove underline-offset-4 transition-colors hover:text-olive-leaf hover:underline sm:fixed sm:right-6 sm:top-6 sm:bg-white/85 sm:backdrop-blur-sm"
      aria-label={
        nextLanguage === "en"
          ? dictionary.common.switchToEnglish
          : dictionary.common.switchToGreek
      }
    >
      {nextLanguage === "en"
        ? dictionary.common.englishLanguageLabel
        : dictionary.common.greekLanguageLabel}
    </Link>
  );
}
