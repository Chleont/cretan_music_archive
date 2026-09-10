'use client';

import { FolderKanban, Home, Music, Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from '@/components/motion-primitives/dock';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Homepage',
    href: '/',
    icon: Home,
  },
  {
    label: 'Musicians',
    href: '/musicians',
    icon: Users,
  },
  {
    label: 'Songs',
    href: '/songs',
    icon: Music,
  },
  {
    label: 'Project',
    href: '/project',
    icon: FolderKanban,
  },
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <footer className="absolute inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 pt-10 pointer-events-none sm:pb-6">
      <nav
        className="pointer-events-auto"
        aria-label="Primary navigation"
      >
        <Dock
          panelHeight={65}
          magnification={100}
          distance={100}
          className="bg-surface/95 shadow-lg shadow-accent/15 backdrop-blur-xl"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/'
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <DockItem
                key={item.href}
                className="cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <DockLabel className="border-none bg-cretan-slate text-archive-ivory shadow-sm text-md">
                  {item.label}
                </DockLabel>
                <DockIcon>
                  <span
                    className={cn(
                      'flex aspect-square w-full items-center justify-center rounded-xl transition-colors',
                      isActive
                        ? 'bg-archive-ivory/95 text-deep-grove'
                        : 'bg-surface text-archive-black hover:text-foreground'
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
