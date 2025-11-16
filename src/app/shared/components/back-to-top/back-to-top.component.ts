import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackToTopComponent {
  @Input({ transform: booleanAttribute })
  visible = false;

  @Output()
  backToTop = new EventEmitter<void>();
}
