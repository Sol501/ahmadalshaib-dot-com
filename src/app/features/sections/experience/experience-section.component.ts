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
    class: 'page-section experience-section'
  }
})
export class ExperienceSectionComponent {
  readonly experiences = signal<readonly ExperienceSummary[]>([]);
}
