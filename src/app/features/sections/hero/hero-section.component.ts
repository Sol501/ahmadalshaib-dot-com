import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { PORTFOLIO_CONTENT } from '../../../core/content/portfolio-content';

@Component({
  selector: 'app-hero-section',
  imports: [NgOptimizedImage],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  host: {
    id: 'hero',
    class: 'page-section hero-section',
  },
})
export class HeroSectionComponent {
  readonly content = PORTFOLIO_CONTENT;
}
