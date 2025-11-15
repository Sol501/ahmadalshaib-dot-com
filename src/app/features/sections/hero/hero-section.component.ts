import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ScrollAnchorDirective } from '../../../shared/directives/scroll-anchor/scroll-anchor.directive';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ScrollAnchorDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'hero',
    class: 'page-section hero-section'
  }
})
export class HeroSectionComponent {}
