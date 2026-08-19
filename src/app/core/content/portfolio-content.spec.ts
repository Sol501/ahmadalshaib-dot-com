import { PORTFOLIO_CONTENT } from './portfolio-content';

describe('PORTFOLIO_CONTENT', () => {
  it('keeps all recruiter contact and résumé targets usable', () => {
    expect(PORTFOLIO_CONTENT.contact.emailHref).toBe('mailto:ahmad.alshaib@outlook.com');
    expect(PORTFOLIO_CONTENT.contact.phoneHref).toBe('tel:+971524237060');
    expect(PORTFOLIO_CONTENT.contact.phoneAvailability).toBe('Active from 12 September 2026');
    expect(PORTFOLIO_CONTENT.contact.linkedin.url).toMatch(/^https:\/\//);
    expect(PORTFOLIO_CONTENT.contact.github.url).toMatch(/^https:\/\//);
    expect(PORTFOLIO_CONTENT.resume).toMatchObject({
      available: true,
      path: '/Ahmad-Alshaib-Senior-Frontend-Engineer-Resume.pdf',
    });
  });

  it('contains the three approved, conservatively framed case studies', () => {
    expect(PORTFOLIO_CONTENT.caseStudies.map(({ title }) => title)).toEqual([
      'Toters Merchant Self-Serve Platform',
      'Toters Highlights / Ads',
      'Syrian Manufacturing',
    ]);
    expect(PORTFOLIO_CONTENT.caseStudies[1].contributions.join(' ')).toContain('associated with');
    expect(PORTFOLIO_CONTENT.caseStudies[2].link?.url).toBe('https://www.syrianmanufacturing.com/');
  });

  it('includes the verified education and language details', () => {
    expect(PORTFOLIO_CONTENT.education).toEqual({
      institution: 'Arab International University',
      degree: 'Bachelor of Engineering in Artificial Intelligence',
      graduation: 'Graduated August 2021',
    });
    expect(PORTFOLIO_CONTENT.languages).toContainEqual({
      language: 'English',
      proficiency: 'Professional proficiency',
      credential: 'IELTS 7.5',
    });
  });
});
