import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[appScrollAnchor]',
  standalone: true
})
export class ScrollAnchorDirective {
  @Input('appScrollAnchor')
  targetId?: string;

  private readonly document = inject(DOCUMENT);
  private readonly headerOffsetPx = 96;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.targetId) {
      return;
    }

    const destination = this.document.getElementById(this.targetId);
    if (!destination) {
      return;
    }

    const win = this.document.defaultView;
    if (!win) {
      return;
    }

    event.preventDefault();
    const targetPosition =
      destination.getBoundingClientRect().top + win.scrollY - this.headerOffsetPx;
    win.scrollTo({ top: Math.max(targetPosition, 0), behavior: 'smooth' });

    const hash = `#${this.targetId}`;
    if (win.location.hash !== hash) {
      win.history.replaceState({}, '', hash);
    }
  }
}
