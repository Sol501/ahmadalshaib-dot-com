import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SocialLink } from './_models/social-link.model';

@Component({
  selector: 'app-social-links',
  standalone: true,
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  @Input({ required: true })
  links: readonly SocialLink[] = [];
}
