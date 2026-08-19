import { TestBed } from '@angular/core/testing';

import { HeaderComponent, resolveActiveSection } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.removeProperty('color-scheme');
    TestBed.configureTestingModule({ imports: [HeaderComponent] });
  });

  it('exposes the recruiter navigation and resume download', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.site-header__nav-link'));
    const resume = element.querySelector<HTMLAnchorElement>('.site-header__resume');

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '#about',
      '#experience',
      '#work',
      '#skills',
      '#contact',
    ]);
    expect(resume?.getAttribute('href')).toBe('/Ahmad-Alshaib-Web-Engineer-Resume.pdf');
    expect(resume?.hasAttribute('download')).toBe(true);
  });

  it('opens the mobile disclosure and closes it with Escape', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    const menuButton = element.querySelector<HTMLButtonElement>('.site-header__menu-toggle');
    const navigation = element.querySelector<HTMLElement>('.site-header__nav');

    menuButton?.click();
    fixture.detectChanges();
    expect(menuButton?.getAttribute('aria-expanded')).toBe('true');
    expect(navigation?.classList.contains('site-header__nav--open')).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(menuButton?.getAttribute('aria-expanded')).toBe('false');
    expect(navigation?.classList.contains('site-header__nav--open')).toBe(false);
  });

  it('marks the active section with aria-current', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentInstance.activeSection.set('work');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    const activeLink = element.querySelector<HTMLAnchorElement>(
      '.site-header__nav-link[aria-current="location"]',
    );
    expect(activeLink?.getAttribute('href')).toBe('#work');
  });

  it('marks a selected navigation target immediately', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    element.querySelector<HTMLAnchorElement>('a[href="#experience"]')?.click();
    fixture.detectChanges();

    expect(
      element.querySelector<HTMLAnchorElement>('.site-header__nav-link[aria-current="location"]')
        ?.textContent,
    ).toContain('Experience');
  });

  it('resolves the active section consistently in either scroll direction', () => {
    expect(
      resolveActiveSection(
        [
          { targetId: 'about', top: -700 },
          { targetId: 'experience', top: 72 },
          { targetId: 'work', top: 1400 },
        ],
        80,
        false,
      ),
    ).toBe('experience');

    expect(
      resolveActiveSection(
        [
          { targetId: 'about', top: -1500 },
          { targetId: 'experience', top: -600 },
          { targetId: 'work', top: 120 },
        ],
        80,
        false,
      ),
    ).toBe('experience');
  });

  it('marks Contact at the bottom of the document', () => {
    expect(
      resolveActiveSection(
        [
          { targetId: 'about', top: -6000 },
          { targetId: 'experience', top: -5000 },
          { targetId: 'work', top: -3000 },
          { targetId: 'skills', top: -1200 },
          { targetId: 'contact', top: 180 },
        ],
        80,
        true,
      ),
    ).toBe('contact');
  });

  it('persists a theme change and updates the document color scheme', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    const themeButton = element.querySelector<HTMLButtonElement>('.site-header__theme-toggle');
    themeButton?.click();
    fixture.detectChanges();

    expect(localStorage.getItem('theme-preference')).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(document.documentElement.style.getPropertyValue('color-scheme')).toBe('dark');
  });
});
