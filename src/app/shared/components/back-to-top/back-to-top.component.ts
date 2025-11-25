import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [IconComponent, TooltipDirective],
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
