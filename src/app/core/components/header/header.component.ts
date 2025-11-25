import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { NavigationLink } from '../../models/navigation-link.model';
import { ScrollAnchorDirective } from '../../../shared/directives/scroll-anchor/scroll-anchor.directive';
import { ThemeService } from '../../services/theme.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { TooltipDirective } from '../../../shared/directives/tooltip/tooltip.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ScrollAnchorDirective, IconComponent, TooltipDirective],
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
    this.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  );
  readonly themeIcon = computed(() => (this.theme() === 'dark' ? 'sun' : 'moon'));

  toggleTheme(event: MouseEvent): void {
    const nextTheme = this.theme() === 'light' ? 'dark' : 'light';
    this._themeService.triggerRipple(nextTheme, event.clientX, event.clientY);
    this._themeService.setTheme(nextTheme);
  }
}
