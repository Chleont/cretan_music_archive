"use client";

import { FolderKanban, Home, Music, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from "@/components/motion-primitives/dock";
import { cn } from "@/lib/utils";

type NavLabels = {
  home: string;
  musicians: string;
  tracks: string;
  project: string;
};

type NavProps = {
  labels: NavLabels;
  ariaLabel: string;
};

export function Nav({ labels, ariaLabel }: NavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    {
      label: labels.home,
      href: "/",
      icon: Home,
    },
    {
      label: labels.musicians,
      href: "/musicians",
      icon: Users,
    },
    {
      label: labels.tracks,
      href: "/tracks",
      icon: Music,
    },
    {
      label: labels.project,
      href: "/project",
      icon: FolderKanban,
    },
  ];
// TODO: Disactivate hover animation for small screens 
  return (
    <footer className="pointer-events-none relative z-50 flex justify-center px-4 sm:absolute sm:inset-x-0 sm:bottom-0 sm:pb-6 sm:pt-10">
      <nav className="pointer-events-auto" aria-label={ariaLabel}>
        <Dock
          panelHeight={65}
          magnification={100}
          distance={100}
          className="bg-surface/95 shadow-lg shadow-accent/15 backdrop-blur-xl"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <DockItem
                key={item.href}
                className="cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <DockLabel className="border-none bg-cretan-slate text-md text-archive-ivory shadow-sm">
                  {item.label}
                </DockLabel>
                <DockIcon>
                  <span
                    className={cn(
                      "flex aspect-square w-full items-center justify-center rounded-xl transition-colors",
                      isActive
                        ? "bg-archive-ivory/95 text-deep-grove"
                        : "bg-surface text-archive-black hover:text-foreground"
                    )}
                  >
                    <Icon className="h-8/12 w-8/12" aria-hidden="true" />
                    <span className="sr-only">{item.label}</span>
                  </span>
                </DockIcon>
              </DockItem>
            );
          })}
        </Dock>
      </nav>
    </footer>
  );
}
