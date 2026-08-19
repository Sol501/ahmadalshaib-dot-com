import { Component } from '@angular/core';

import { PORTFOLIO_CONTENT } from '../../../core/content/portfolio-content';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-contact-section',
  imports: [SectionHeadingComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  host: {
    id: 'contact',
    class: 'page-section contact-section',
  },
})
export class ContactSectionComponent {
  readonly content = PORTFOLIO_CONTENT;
}
