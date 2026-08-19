import { Component } from '@angular/core';

import { PORTFOLIO_CONTENT } from '../../../core/content/portfolio-content';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-about-section',
  imports: [SectionHeadingComponent],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
  host: {
    id: 'about',
    class: 'page-section about-section',
  },
})
export class AboutSectionComponent {
  readonly content = PORTFOLIO_CONTENT;
}
