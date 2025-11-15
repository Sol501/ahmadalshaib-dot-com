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
  readonly skillGroups = signal<readonly SkillGroup[]>([]);
}
