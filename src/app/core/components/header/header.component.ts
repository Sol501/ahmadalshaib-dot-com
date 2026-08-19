import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, computed, DestroyRef, inject, signal } from '@angular/core';

import { PORTFOLIO_CONTENT } from '../../content/portfolio-content';
import { ThemeService } from '../../services/theme.service';

interface NavigationItem {
  readonly label: string;
  readonly targetId: 'about' | 'experience' | 'work' | 'skills' | 'contact';
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly content = PORTFOLIO_CONTENT;
  readonly links: readonly NavigationItem[] = [
    { label: 'About', targetId: 'about' },
    { label: 'Experience', targetId: 'experience' },
    { label: 'Work', targetId: 'work' },
    { label: 'Skills', targetId: 'skills' },
    { label: 'Contact', targetId: 'contact' },
  ];
  readonly mobileMenuOpen = signal(false);
  readonly activeSection = signal<NavigationItem['targetId'] | null>(null);
  readonly theme = this.themeService.theme;
  readonly themeLabel = computed(() =>
    this.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
  );

  constructor() {
    afterNextRender(() => {
      if (!('IntersectionObserver' in globalThis)) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

          if (visible?.target.id) {
            this.activeSection.set(visible.target.id as NavigationItem['targetId']);
          }
        },
        { rootMargin: '-18% 0px -65% 0px', threshold: [0, 0.15, 0.4] },
      );

      for (const link of this.links) {
        const section = this.document.getElementById(link.targetId);
        if (section) {
          observer.observe(section);
        }
      }

      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
