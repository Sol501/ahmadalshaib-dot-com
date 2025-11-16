import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  AfterViewInit,
  signal,
} from '@angular/core';

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
    ContactSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  readonly showBackToTop = signal(false);
  private readonly heroSectionId = 'hero';
  private readonly intersectionObserver: IntersectionObserver;

  constructor() {
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.showBackToTop.set(!entry.isIntersecting);
    });
  }

  ngAfterViewInit(): void {
    const heroSection = document.getElementById(this.heroSectionId);

    if (heroSection) {
      this.intersectionObserver.observe(heroSection);
    }
  }

  ngOnDestroy(): void {
    this.intersectionObserver.disconnect();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
