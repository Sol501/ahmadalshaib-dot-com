import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss',
})
export class SectionHeadingComponent {
  readonly title = input.required<string>();
  readonly eyebrow = input<string>();
  readonly description = input<string>();
}
