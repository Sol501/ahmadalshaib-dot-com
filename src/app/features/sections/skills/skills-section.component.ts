import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { SkillGroup } from '../../../core/models/skill.model';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [SectionHeadingComponent, IconComponent],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'skills',
    class: 'page-section skills-section',
  },
})
export class SkillsSectionComponent {
  readonly skillGroups = signal<readonly SkillGroup[]>([
    {
      id: 'frontend',
      label: 'Frontend & Frameworks',
      icon: 'framework',
      skills: [
        { id: 'angular19', name: 'Angular 10-20', icon: 'skills/angular' },
        { id: 'typescript', name: 'TypeScript', icon: 'skills/typescript' },
        { id: 'rxjs', name: 'RxJS', icon: 'skills/rxjs' },
        { id: 'html5', name: 'HTML5', icon: 'skills/html5' },
        { id: 'css', name: 'CSS / SASS', icon: 'skills/css3' },
        { id: 'javascript', name: 'JavaScript (ESNext)', icon: 'skills/javascript' },
      ],
    },
    {
      id: 'architecture',
      label: 'Architecture & Delivery',
      icon: 'architecture',
      skills: [
        { id: 'nx', name: 'Nx Monorepos', icon: 'skills/nx' },
        { id: 'webpack', name: 'Webpack / Vite', icon: 'skills/webpack' },
        { id: 'rest', name: 'REST APIs', icon: 'skills/rest' },
        { id: 'websockets', name: 'WebSockets', icon: 'skills/websockets' },
        { id: 'ci', name: 'GitLab CI', icon: 'skills/gitlab' },
        { id: 'scrum', name: 'Agile / Scrum', icon: 'skills/agile' },
      ],
    },
    {
      id: 'testing',
      label: 'Testing & Quality',
      icon: 'quality',
      skills: [
        { id: 'jest', name: 'Jest + ng-mocks', icon: 'skills/jest' },
        { id: 'cypress', name: 'Cypress', icon: 'skills/cypress' },
        { id: 'playwright', name: 'Playwright', icon: 'skills/playwright' },
        { id: 'accessibility', name: 'Accessibility (RTL / WCAG)', icon: 'skills/accessibility' },
        {
          id: 'profiling',
          name: 'Performance profiling (LCP/CLS/TBT)',
          icon: 'skills/performance',
        },
      ],
    },
    {
      id: 'soft',
      label: 'Communication',
      icon: 'communication',
      skills: [
        { id: 'arabic', name: 'Arabic (native)' },
        { id: 'english', name: 'English (IELTS 7.5)' },
        { id: 'cross-team', name: 'Cross-functional collaboration', icon: 'skills/collaboration' },
      ],
    },
  ]);
}
