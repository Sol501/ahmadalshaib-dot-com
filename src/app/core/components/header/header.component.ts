import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { NavigationLink } from '../../models/navigation-link.model';
import { ScrollAnchorDirective } from '../../../shared/directives/scroll-anchor/scroll-anchor.directive';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ScrollAnchorDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly _themeService = inject(ThemeService);

  readonly links = signal<readonly NavigationLink[]>([
    { id: 'nav-hero', label: 'Hero', targetId: 'hero' },
    { id: 'nav-about', label: 'About', targetId: 'about' },
    { id: 'nav-experience', label: 'Experience', targetId: 'experience' },
    { id: 'nav-projects', label: 'Projects', targetId: 'projects' },
    { id: 'nav-skills', label: 'Skills', targetId: 'skills' },
    { id: 'nav-contact', label: 'Contact', targetId: 'contact' },
  ]);

  readonly theme = this._themeService.theme;
  readonly themeLabel = computed(() =>
    this.theme() === 'dark' ? 'Switch to light' : 'Switch to dark'
  );
  readonly themeIcon = computed(() => (this.theme() === 'dark' ? '☀️' : '🌙'));

  toggleTheme(): void {
    this._themeService.toggle();
  }
}
