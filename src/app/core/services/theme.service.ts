import { Injectable, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Theme = 'light' | 'dark';

const _STORAGE_KEY = 'theme-preference';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _document = inject(DOCUMENT);
  private readonly _storedPreference = this._readStoredPreference();

  readonly theme = signal<Theme>(this._getInitialTheme());

  constructor() {
    effect(() => {
      const next = this.theme();
      this._applyTheme(next);
      this._persistPreference(next);
    });
  }

  toggle(): void {
    this.theme.update((current) => (current === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  private _getInitialTheme(): Theme {
    if (this._storedPreference === 'light' || this._storedPreference === 'dark') {
      return this._storedPreference;
    }

    const prefersDark = this._document.defaultView?.matchMedia?.(
      '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? 'dark' : 'light';
  }

  private _applyTheme(theme: Theme): void {
    const root = this._document.documentElement;
    if (theme === 'dark') {
      root.dataset['theme'] = 'dark';
    } else {
      root.removeAttribute('data-theme');
    }
    root.style.setProperty('color-scheme', theme);
  }

  private _persistPreference(theme: Theme): void {
    try {
      this._document.defaultView?.localStorage?.setItem(_STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }

  private _readStoredPreference(): Theme | null {
    try {
      const value = this._document.defaultView?.localStorage?.getItem(_STORAGE_KEY);
      if (value === 'light' || value === 'dark') {
        return value;
      }
      return null;
    } catch {
      return null;
    }
  }
}
