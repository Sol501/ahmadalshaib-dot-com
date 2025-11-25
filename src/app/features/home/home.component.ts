import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  AfterViewInit,
  signal,
  inject,
} from '@angular/core';

import { SeoService } from '../../core/services/seo.service';
import { BackToTopComponent } from '../../shared/components/back-to-top/back-to-top.component';
import { AboutSectionComponent } from '../sections/about/about-section.component';
import { ContactSectionComponent } from '../sections/contact/contact-section.component';
import { ExperienceSectionComponent } from '../sections/experience/experience-section.component';
import { HeroSectionComponent } from '../sections/hero/hero-section.component';
import { ProjectsSectionComponent } from '../sections/projects/projects-section.component';
import { SkillsSectionComponent } from '../sections/skills/skills-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BackToTopComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  readonly showBackToTop = signal(false);
  private readonly _heroSectionId = 'hero';
  private readonly _intersectionObserver: IntersectionObserver;
  private readonly _seoService = inject(SeoService);

  constructor() {
    this._seoService.updateTags({
      title: 'Ahmad Alshaib | Frontend Engineer (Angular / TypeScript)',
      description:
        'Frontend Engineer in Damascus building enterprise-grade Angular dashboards and self-serve platforms with measurable performance, testing, and UX impact.',
      keywords: [
        'Ahmad Alshaib',
        'Frontend Engineer',
        'Angular developer',
        'TypeScript',
        'Nx',
        'Jest',
        'Damascus',
        'Remote',
      ],
    });

    this._intersectionObserver = new IntersectionObserver(([entry]) => {
      this.showBackToTop.set(!entry.isIntersecting);
    });
  }

  ngAfterViewInit(): void {
    const heroSection = document.getElementById(this._heroSectionId);

    if (heroSection) {
      this._intersectionObserver.observe(heroSection);
    }
  }

  ngOnDestroy(): void {
    this._intersectionObserver.disconnect();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
