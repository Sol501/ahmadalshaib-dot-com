import { Component } from '@angular/core';

import { PORTFOLIO_CONTENT, PortfolioLanguage } from '../../../core/content/portfolio-content';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-education-section',
  imports: [SectionHeadingComponent],
  templateUrl: './education-section.component.html',
  styleUrl: './education-section.component.scss',
  host: {
    id: 'education',
    class: 'page-section education-section',
  },
})
export class EducationSectionComponent {
  readonly education = PORTFOLIO_CONTENT.education;
  readonly languages: readonly PortfolioLanguage[] = PORTFOLIO_CONTENT.languages;
}
