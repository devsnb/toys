'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

/**
 * ThemeToggle
 *
 * To avoid React hydration mismatches we do NOT render theme-dependent icons
 * during server render or the client's initial hydrate render. Instead we
 * render a neutral placeholder element (same structure both server and client)
 * until the component has mounted. After mount we render the correct icon
 * according to the current theme.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // mounted starts false so SSR and the initial client render match.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // mark mounted on client only after hydration
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
    >
      {mounted ? (
        // Only render these after the component has mounted
        theme === 'light' ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : theme === 'dark' ? (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Monitor className="h-[1.2rem] w-[1.2rem]" />
        )
      ) : (
        // Neutral placeholder ensures SSR/client initial render match
        <span className="inline-block h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
