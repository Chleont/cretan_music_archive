"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { siteMetadata } from "@/lib/site-metadata";
import { getLocale } from "@/lib/translations";

export function LocaleMetadata() {
  const searchParams = useSearchParams();
  const locale = getLocale(searchParams.get("lang") ?? undefined);

  useEffect(() => {
    const metadata = siteMetadata[locale];
    document.title = metadata.title;
    document.documentElement.lang = locale;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.description);
  }, [locale]);

  return null;
}
