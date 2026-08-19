import { Component } from '@angular/core';

import { PORTFOLIO_CONTENT } from '../../content/portfolio-content';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly content = PORTFOLIO_CONTENT;
}
