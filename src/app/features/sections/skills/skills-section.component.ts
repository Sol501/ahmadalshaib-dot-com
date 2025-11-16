import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { SkillGroup } from '../../../core/models/skill.model';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [SectionHeadingComponent],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'skills',
    class: 'page-section skills-section'
  }
})
export class SkillsSectionComponent {
  readonly skillGroups = signal<readonly SkillGroup[]>([
    {
      id: 'frontend',
      label: 'Frontend & Frameworks',
      skills: [
        { id: 'angular19', name: 'Angular 10-19' },
        { id: 'typescript', name: 'TypeScript' },
        { id: 'rxjs', name: 'RxJS' },
        { id: 'html5', name: 'HTML5' },
        { id: 'css', name: 'CSS / SASS' },
        { id: 'javascript', name: 'JavaScript (ESNext)' }
      ]
    },
    {
      id: 'architecture',
      label: 'Architecture & Delivery',
      skills: [
        { id: 'nx', name: 'Nx Monorepos' },
        { id: 'webpack', name: 'Webpack / Vite' },
        { id: 'rest', name: 'REST APIs' },
        { id: 'websockets', name: 'WebSockets' },
        { id: 'ci', name: 'GitLab CI' },
        { id: 'scrum', name: 'Agile / Scrum' }
      ]
    },
    {
      id: 'testing',
      label: 'Testing & Quality',
      skills: [
        { id: 'jest', name: 'Jest + ng-mocks' },
        { id: 'cypress', name: 'Cypress' },
        { id: 'playwright', name: 'Playwright' },
        { id: 'accessibility', name: 'Accessibility (RTL / WCAG)' },
        { id: 'profiling', name: 'Performance profiling (LCP/CLS/TBT)' }
      ]
    },
    {
      id: 'soft',
      label: 'Communication',
      skills: [
        { id: 'arabic', name: 'Arabic (native)' },
        { id: 'english', name: 'English (IELTS 7.5)' },
        { id: 'cross-team', name: 'Cross-functional collaboration' }
      ]
    }
  ]);
}
