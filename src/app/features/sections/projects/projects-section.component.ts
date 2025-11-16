import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { ProjectSummary } from '../../../core/models/project.model';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { ListJoinPipe } from '../../../shared/pipes/list-join/list-join.pipe';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [SectionHeadingComponent, ListJoinPipe],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'projects',
    class: 'page-section projects-section'
  }
})
export class ProjectsSectionComponent {
  readonly projects = signal<readonly ProjectSummary[]>([
    {
      id: 'syrianmanufacturing',
      title: 'syrianmanufacturing.com Admin Dashboard',
      description:
        'Angular admin surface for Damascus Chamber of Industry that raised engagement and sped up workflows for manufacturing members.',
      techStack: ['Angular', 'TypeScript', 'REST APIs', 'RxJS', 'SASS'],
      highlights: [
        'Delivered new features that boosted daily active users by ~20%.',
        'Cut dashboard load times by roughly 30%, improving perceived performance.',
        'Added interactive visualizations that increased time on site by ~30% and conversions by ~10%.'
      ],
      links: [
        {
          label: 'Case Study',
          url: 'https://syrianmanufacturing.com',
          type: 'live'
        }
      ]
    }
  ]);
}
