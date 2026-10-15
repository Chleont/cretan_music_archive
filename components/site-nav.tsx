"use client";

import Link from "next/link";
import { FolderKanban, Home, Menu, Music, Users, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getDictionary, getLocale } from "@/lib/translations";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const locale = getLocale(searchParams.get("lang") ?? undefined);
  const dictionary = getDictionary(locale);
  const nextLanguage = locale === "en" ? "el" : "en";

  if (pathname === "/") {
    return null;
  }

  const navItems = [
    {
      label: dictionary.navigation.home,
      href: "/",
      icon: Home,
    },
    {
      label: dictionary.navigation.musicians,
      href: "/musicians",
      icon: Users,
    },
    {
      label: dictionary.navigation.tracks,
      href: "/tracks",
      icon: Music,
    },
    {
      label: dictionary.navigation.project,
      href: "/project",
      icon: FolderKanban,
    },
  ];

  function hrefFor(href: string) {
    return locale === "en" ? `${href}?lang=en` : href;
  }

  function languageHref() {
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
    <header className="fixed left-4 right-4 top-4 z-50 rounded-md bg-white/85 px-2 py-2 shadow-[0_0_18px_rgba(255,255,255,0.38)] backdrop-blur-sm sm:left-6 sm:right-6 sm:top-6">
      <div className="flex items-center justify-between gap-3">
      <nav className="hidden items-center gap-1 md:flex" aria-label={dictionary.common.primaryNavigation}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={hrefFor(item.href)}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-deep-grove transition-colors hover:bg-archive-ivory hover:text-olive-leaf",
                isActive && "bg-archive-ivory text-olive-leaf"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="md:hidden">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center text-deep-grove transition-colors hover:text-olive-leaf"
          aria-label={
            isOpen ? dictionary.common.closeNavigation : dictionary.common.openNavigation
          }
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>

        {isOpen ? (
          <div className="absolute left-2 top-full mt-2 grid min-w-44 gap-1 rounded-md border border-deep-grove/10 bg-white p-2 shadow-lg shadow-archive-black/10">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={hrefFor(item.href)}
                  className="flex items-center gap-2 rounded px-3 py-2 text-sm font-bold text-deep-grove transition-colors hover:bg-archive-ivory"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
      <Link
        href={languageHref()}
        className="px-2 py-1 text-sm font-bold text-deep-grove underline-offset-4 transition-colors hover:text-olive-leaf hover:underline"
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
      </div>
    </header>
  );
}
