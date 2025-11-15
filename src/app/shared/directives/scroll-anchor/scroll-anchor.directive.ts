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

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.targetId) {
      return;
    }

    const destination = this.document.getElementById(this.targetId);
    if (!destination) {
      return;
    }

    event.preventDefault();
    destination.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const win = this.document.defaultView;
    if (win) {
      const hash = `#${this.targetId}`;
      if (win.location.hash !== hash) {
        win.history.replaceState({}, '', hash);
      }
    }
  }
}
