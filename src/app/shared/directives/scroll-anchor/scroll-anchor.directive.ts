import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[appScrollAnchor]',
  standalone: true
})
export class ScrollAnchorDirective {
  @Input('appScrollAnchor')
  targetId?: string;

  private readonly _document = inject(DOCUMENT);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.targetId) {
      return;
    }

    const destination = this._document.getElementById(this.targetId);
    if (!destination) {
      return;
    }

    const win = this._document.defaultView;
    if (!win) {
      return;
    }

    event.preventDefault();
    const headerEl = this._document.querySelector<HTMLElement>('.site-header');
    const headerOffsetPx = headerEl ? headerEl.getBoundingClientRect().height + 12 : 96;
    const targetPosition =
      destination.getBoundingClientRect().top + win.scrollY - Math.max(headerOffsetPx, 0);
    win.scrollTo({ top: Math.max(targetPosition, 0), behavior: 'smooth' });

    const hash = `#${this.targetId}`;
    if (win.location.hash !== hash) {
      win.history.replaceState({}, '', hash);
    }
  }
}
