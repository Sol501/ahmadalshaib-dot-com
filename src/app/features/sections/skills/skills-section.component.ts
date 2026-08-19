import { Component } from '@angular/core';

import { PORTFOLIO_CONTENT, PortfolioSkillGroup } from '../../../core/content/portfolio-content';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-skills-section',
  imports: [SectionHeadingComponent],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss',
  host: {
    id: 'skills',
    class: 'page-section skills-section',
  },
})
export class SkillsSectionComponent {
  readonly skillGroups: readonly PortfolioSkillGroup[] = PORTFOLIO_CONTENT.skillGroups;
}
