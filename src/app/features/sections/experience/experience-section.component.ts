import { Component } from '@angular/core';

import { PORTFOLIO_CONTENT } from '../../../core/content/portfolio-content';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-experience-section',
  imports: [SectionHeadingComponent],
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.scss',
  host: {
    id: 'experience',
    class: 'page-section experience-section',
  },
})
export class ExperienceSectionComponent {
  readonly experiences = PORTFOLIO_CONTENT.experience;
}
