import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { PORTFOLIO_CONTENT } from './core/content/portfolio-content';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('renders the recruiter landing page and all approved case studies', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent?.trim()).toBe('Ahmad Alshaib');
    expect(element.textContent).toContain('Web Engineer · Angular Specialist');

    const caseStudyTitles = Array.from(
      element.querySelectorAll<HTMLHeadingElement>('app-projects-section .work h3'),
      (heading) => heading.textContent?.trim(),
    );
    expect(caseStudyTitles).toEqual(PORTFOLIO_CONTENT.caseStudies.map(({ title }) => title));
    expect(element.textContent).toContain('Education & Languages');
  });

  it('renders direct recruiter contact and resume targets without a form', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(
      element.querySelector(`a[href="${PORTFOLIO_CONTENT.contact.emailHref}"]`),
    ).not.toBeNull();
    expect(
      element.querySelector(`a[href="${PORTFOLIO_CONTENT.contact.phoneHref}"]`),
    ).not.toBeNull();
    expect(
      element.querySelector(`a[download][href="${PORTFOLIO_CONTENT.resume.path}"]`),
    ).not.toBeNull();
    expect(element.querySelector('form')).toBeNull();
  });
});
