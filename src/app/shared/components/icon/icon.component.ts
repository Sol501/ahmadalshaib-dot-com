import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, numberAttribute } from '@angular/core';

import { IconName } from './_models/icon-name.model';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgStyle],
  template: `
    <span
      class="icon"
      [ngStyle]="{
        width: size + 'px',
        height: size + 'px',
        maskImage: 'url(' + assetPath + ')',
        WebkitMaskImage: 'url(' + assetPath + ')'
      }"
      [attr.aria-hidden]="ariaLabel ? null : 'true'"
      [attr.aria-label]="ariaLabel || null"
      role="img"
    ></span>
  `,
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input({ required: true })
  name!: IconName;

  @Input({ transform: numberAttribute })
  size = 20;

  @Input()
  ariaLabel?: string;

  get assetPath(): string {
    return `assets/icons/${this.name}.svg`;
  }
}
