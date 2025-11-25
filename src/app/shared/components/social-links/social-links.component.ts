import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SocialLink } from './_models/social-link.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  @Input({ required: true })
  links: readonly SocialLink[] = [];
}
