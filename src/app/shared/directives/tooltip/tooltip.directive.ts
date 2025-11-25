import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit, OnDestroy, OnChanges {
  @Input('appTooltip') tooltipText = '';
  @Input() tooltipPlacement: TooltipPlacement = 'top';

  private readonly _document = inject(DOCUMENT);
  private readonly _host = inject(ElementRef<HTMLElement>);
  private _tooltipEl: HTMLDivElement | null = null;

  ngOnInit(): void {
    this._ensureStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tooltipText'] && this._tooltipEl) {
      this._tooltipEl.innerText = this.tooltipText;
      this._positionTooltip();
    }
  }

  ngOnDestroy(): void {
    this.hideTooltip();
  }

  @HostListener('pointerenter', ['$event'])
  onPointerEnter(event: PointerEvent): void {
    if (event.pointerType === 'touch') {
      return;
    }
    this._showTooltip();
  }

  @HostListener('pointerleave')
  hideTooltip(): void {
    if (this._tooltipEl) {
      this._tooltipEl.remove();
      this._tooltipEl = null;
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    if (this._tooltipEl) {
      this._positionTooltip();
    }
  }

  private _showTooltip(): void {
    if (!this.tooltipText) {
      return;
    }

    if (!this._tooltipEl) {
      this._tooltipEl = this._document.createElement('div');
      this._tooltipEl.className = 'app-tooltip';
      this._tooltipEl.innerText = this.tooltipText;
      this._document.body.appendChild(this._tooltipEl);
    }

    this._tooltipEl.innerText = this.tooltipText;
    this._tooltipEl.style.visibility = 'hidden';
    this._tooltipEl.style.opacity = '0';
    this._tooltipEl.style.transform = 'scale(0.97)';

    requestAnimationFrame(() => {
      if (!this._tooltipEl) {
        return;
      }
      this._positionTooltip();
      this._tooltipEl.style.visibility = 'visible';
      this._tooltipEl.style.opacity = '1';
      this._tooltipEl.style.transform = 'scale(1)';
    });
  }

  private _positionTooltip(): void {
    if (!this._tooltipEl) {
      return;
    }

    const hostRect = this._host.nativeElement.getBoundingClientRect();
    const tooltipRect = this._tooltipEl.getBoundingClientRect();
    const margin = 12;
    const placements: TooltipPlacement[] = [
      this.tooltipPlacement,
      'bottom',
      'top',
      'right',
      'left',
    ];

    for (const place of placements) {
      const pos = this._calculatePosition(place, hostRect, tooltipRect, margin);
      if (this._fitsInViewport(pos, tooltipRect, margin)) {
        this._applyPosition(pos, place);
        return;
      }
    }

    const fallbackPos = this._calculatePosition(
      this.tooltipPlacement,
      hostRect,
      tooltipRect,
      margin
    );
    this._applyPosition(fallbackPos, this.tooltipPlacement);
  }

  private _calculatePosition(
    placement: TooltipPlacement,
    host: DOMRect,
    tooltip: DOMRect,
    margin: number
  ): { top: number; left: number } {
    switch (placement) {
      case 'bottom':
        return {
          top: host.bottom + margin,
          left: host.left + host.width / 2 - tooltip.width / 2,
        };
      case 'left':
        return {
          top: host.top + host.height / 2 - tooltip.height / 2,
          left: host.left - tooltip.width - margin,
        };
      case 'right':
        return {
          top: host.top + host.height / 2 - tooltip.height / 2,
          left: host.right + margin,
        };
      case 'top':
      default:
        return {
          top: host.top - tooltip.height - margin,
          left: host.left + host.width / 2 - tooltip.width / 2,
        };
    }
  }

  private _fitsInViewport(
    pos: { top: number; left: number },
    tooltip: DOMRect,
    margin: number
  ): boolean {
    const win = this._document.defaultView;
    if (!win) return true;

    const { innerWidth, innerHeight } = win;
    return (
      pos.left >= margin &&
      pos.top >= margin &&
      pos.left + tooltip.width <= innerWidth - margin &&
      pos.top + tooltip.height <= innerHeight - margin
    );
  }

  private _applyPosition(pos: { top: number; left: number }, placement: TooltipPlacement): void {
    if (!this._tooltipEl) return;
    this._tooltipEl.style.top = `${pos.top}px`;
    this._tooltipEl.style.left = `${pos.left}px`;
    this._tooltipEl.dataset['placement'] = placement;
  }

  private _ensureStyles(): void {
    const styleId = 'app-tooltip-styles';
    if (this._document.getElementById(styleId)) {
      return;
    }
    const styleEl = this._document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      .app-tooltip {
        position: fixed;
        z-index: 1000;
        padding: 0.35rem 0.6rem;
        border-radius: 0.5rem;
        background: color-mix(in srgb, var(--color-surface, #0b1120) 90%, var(--color-border, #e5e7eb) 10%);
        color: var(--color-text-primary, #0f172a);
        border: 1px solid var(--color-border, rgba(15, 23, 42, 0.12));
        box-shadow: 0 12px 30px rgba(15, 23, 42, 0.2);
        font-size: 0.9rem;
        line-height: 1.3;
        pointer-events: none;
        transition: opacity 120ms ease, transform 120ms ease;
        max-width: 240px;
        word-break: break-word;
        transform-origin: center;
      }

      .app-tooltip::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background: color-mix(in srgb, var(--color-surface, #0b1120) 90%, var(--color-border, #e5e7eb) 10%);
        transform: rotate(45deg);
      }

      .app-tooltip[data-placement='top']::after {
        border-right: 1px solid var(--color-border, rgba(15, 23, 42, 0.12));
        border-bottom: 1px solid var(--color-border, rgba(15, 23, 42, 0.12));
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
      }

      .app-tooltip[data-placement='bottom']::after {
        border-left: 1px solid var(--color-border, rgba(15, 23, 42, 0.12));
        border-top: 1px solid var(--color-border, rgba(15, 23, 42, 0.12));
        top: -6px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
      }

      .app-tooltip[data-placement='left']::after {
        border-right: 1px solid var(--color-border, rgba(15, 23, 42, 0.12));
        border-top: 1px solid var(--color-border, rgba(15, 23, 42, 0.12));
        right: -6px;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
      }

      .app-tooltip[data-placement='right']::after {
        border-left: 1px solid var(--color-border, rgba(15, 23, 42, 0.12));
        border-bottom: 1px solid var(--color-border, rgba(15, 23, 42, 0.12));
        left: -6px;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
      }
    `;
    this._document.head.appendChild(styleEl);
  }
}
