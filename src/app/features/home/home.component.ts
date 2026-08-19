import { Component } from '@angular/core';

import { FooterComponent } from '../../core/components/footer/footer.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { AboutSectionComponent } from '../sections/about/about-section.component';
import { ContactSectionComponent } from '../sections/contact/contact-section.component';
import { EducationSectionComponent } from '../sections/education/education-section.component';
import { ExperienceSectionComponent } from '../sections/experience/experience-section.component';
import { HeroSectionComponent } from '../sections/hero/hero-section.component';
import { ProjectsSectionComponent } from '../sections/projects/projects-section.component';
import { SkillsSectionComponent } from '../sections/skills/skills-section.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent,
    EducationSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
