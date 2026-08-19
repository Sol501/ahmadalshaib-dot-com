import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, computed, DestroyRef, inject, signal } from '@angular/core';

import { PORTFOLIO_CONTENT } from '../../content/portfolio-content';
import { ThemeService } from '../../services/theme.service';

export type NavigationTargetId = 'about' | 'experience' | 'work' | 'skills' | 'contact';

interface NavigationItem {
  readonly label: string;
  readonly targetId: NavigationTargetId;
}

export interface SectionPosition {
  readonly targetId: NavigationTargetId;
  readonly top: number;
}

export function resolveActiveSection(
  positions: readonly SectionPosition[],
  activationLine: number,
  atDocumentEnd: boolean,
): NavigationTargetId | null {
  if (positions.length === 0) {
    return null;
  }

  if (atDocumentEnd) {
    return positions[positions.length - 1].targetId;
  }

  let activeSection: NavigationTargetId | null = null;

  for (const position of positions) {
    if (position.top > activationLine) {
      break;
    }

    activeSection = position.targetId;
  }

  return activeSection;
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
  readonly activeSection = signal<NavigationTargetId | null>(null);
  readonly theme = this.themeService.theme;
  readonly themeLabel = computed(() =>
    this.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
  );

  constructor() {
    afterNextRender(() => this.trackActiveSection());
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  selectSection(targetId: NavigationTargetId, event?: Event): void {
    this.activeSection.set(targetId);
    this.closeMenu();

    const view = this.document.defaultView;
    const section = this.document.getElementById(targetId);
    if (!event || !view || !section) {
      return;
    }

    event.preventDefault();
    view.history.pushState(null, '', `#${targetId}`);
    section.scrollIntoView({
      behavior: view.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  private trackActiveSection(): void {
    const view = this.document.defaultView;
    if (!view) {
      return;
    }

    const sections: { readonly targetId: NavigationTargetId; readonly element: HTMLElement }[] = [];

    for (const link of this.links) {
      const element = this.document.getElementById(link.targetId);
      if (element) {
        sections.push({ targetId: link.targetId, element });
      }
    }

    if (sections.length === 0) {
      return;
    }

    let animationFrameId: number | null = null;

    const updateActiveSection = (): void => {
      animationFrameId = null;

      const headerBottom =
        this.document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().bottom ??
        64;
      const activationLine = headerBottom + 16;
      const root = this.document.documentElement;
      const atDocumentEnd = Math.ceil(view.scrollY + view.innerHeight) >= root.scrollHeight - 2;
      const positions = sections.map(({ targetId, element }) => ({
        targetId,
        top: element.getBoundingClientRect().top,
      }));

      this.activeSection.set(resolveActiveSection(positions, activationLine, atDocumentEnd));
    };

    const scheduleUpdate = (): void => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = view.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    view.addEventListener('scroll', scheduleUpdate, { passive: true });
    view.addEventListener('resize', scheduleUpdate);

    this.destroyRef.onDestroy(() => {
      view.removeEventListener('scroll', scheduleUpdate);
      view.removeEventListener('resize', scheduleUpdate);

      if (animationFrameId !== null) {
        view.cancelAnimationFrame(animationFrameId);
      }
    });
  }
}
