import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { ExperienceSummary } from '../../../core/models/experience.model';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { ListJoinPipe } from '../../../shared/pipes/list-join/list-join.pipe';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [SectionHeadingComponent, ListJoinPipe],
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'experience',
    class: 'page-section experience-section',
  },
})
export class ExperienceSectionComponent {
  readonly experiences = signal<readonly ExperienceSummary[]>([
    {
      id: 'toters',
      company: 'Toters Delivery',
      role: 'Front-End Engineer',
      location: 'Beirut, Lebanon • Remote',
      startDate: 'Feb 2023',
      endDate: 'Present',
      achievements: [
        'Led Jest + ng-mocks unit testing to ~80% coverage, cutting regression bugs by roughly 90%.',
        'Built a Merchant Self-Serve portal for ~2,000 merchants to manage campaigns and catalogs, easing support load.',
        'Developed Highlights (Ads) placements that drove an estimated 5% revenue uplift.',
        'Refactored Angular dashboards to improve load times by ~40-50% and stabilize slow components.',
        'Migrated AngularJS 1.5 code paths to Angular 19 and standardized Nx monorepos/shared libraries.',
        'Implemented WebSockets and hardened REST integrations to keep operations in sync in real time.',
        'Partnered with design and product to deliver accessible, responsive interfaces with performance budgets.',
      ],
      techFocus: ['Angular 19', 'TypeScript', 'Nx', 'Jest', 'ng-mocks', 'WebSockets', 'REST APIs'],
    },
    {
      id: 'albaraka',
      company: 'Albaraka Bank Syria s.a.',
      role: 'Software Developer',
      location: 'Damascus, Syria',
      startDate: 'Nov 2021',
      endDate: 'Feb 2023',
      achievements: [
        'Rolled out GitLab on-prem and migrated legacy projects, improving release cadence and audit trails.',
        'Built an ATM inventory/audit dashboard parsing ATM logs to flag anomalies automatically.',
        'Developed a recruitment portal with ATS-style screening and candidate progress tracking.',
        'Added Cypress end-to-end tests guarding critical HR and back-office workflows.',
      ],
      techFocus: ['Angular', 'TypeScript', 'GitLab CI', 'Cypress', 'REST APIs'],
    },
  ]);
}
