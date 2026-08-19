import { DOCUMENT } from '@angular/common';
import { afterNextRender, inject, Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark';

const _STORAGE_KEY = 'theme-preference';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<Theme>('light');

  constructor() {
    afterNextRender(() => {
      const initialTheme = this.readInitialTheme();
      this.theme.set(initialTheme);
      this.applyTheme(initialTheme);
    });
  }

  toggle(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.applyTheme(theme);
    this.persistPreference(theme);
  }

  private readInitialTheme(): Theme {
    const storedPreference = this.readStoredPreference();
    if (storedPreference) {
      return storedPreference;
    }

    const prefersDark = this.document.defaultView?.matchMedia?.(
      '(prefers-color-scheme: dark)',
    ).matches;
    return prefersDark ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme): void {
    const root = this.document.documentElement;
    root.dataset['theme'] = theme;
    root.style.setProperty('color-scheme', theme);
  }

  private persistPreference(theme: Theme): void {
    try {
      this.document.defaultView?.localStorage?.setItem(_STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable in private browsing or hardened browser contexts.
    }
  }

  private readStoredPreference(): Theme | null {
    try {
      const value = this.document.defaultView?.localStorage?.getItem(_STORAGE_KEY);
      if (value === 'light' || value === 'dark') {
        return value;
      }
      return null;
    } catch {
      return null;
    }
  }
}
