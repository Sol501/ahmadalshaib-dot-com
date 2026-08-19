import { Component } from '@angular/core';

import { PORTFOLIO_CONTENT, PortfolioCaseStudy } from '../../../core/content/portfolio-content';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-projects-section',
  imports: [SectionHeadingComponent],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
  host: {
    id: 'work',
    class: 'page-section projects-section',
  },
})
export class ProjectsSectionComponent {
  readonly caseStudies: readonly PortfolioCaseStudy[] = PORTFOLIO_CONTENT.caseStudies;
}
