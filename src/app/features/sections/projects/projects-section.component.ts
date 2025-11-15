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
  readonly projects = signal<readonly ProjectSummary[]>([]);
}
