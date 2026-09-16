import { PORTFOLIO_CONTENT } from './portfolio-content';

describe('PORTFOLIO_CONTENT', () => {
  it('keeps all recruiter contact and resume targets usable', () => {
    expect(PORTFOLIO_CONTENT.contact.emailHref).toBe('mailto:ahmad.alshaib@outlook.com');
    expect(PORTFOLIO_CONTENT.contact.phoneHref).toBe('tel:+971524237060');
    expect(PORTFOLIO_CONTENT.contact.phoneAvailability).toBe('UAE number');
    expect(PORTFOLIO_CONTENT.contact.linkedin.url).toMatch(/^https:\/\//);
    expect(PORTFOLIO_CONTENT.contact.github.url).toMatch(/^https:\/\//);
    expect(PORTFOLIO_CONTENT.resume).toMatchObject({
      available: true,
      path: '/Ahmad-Alshaib-Web-Engineer-Resume.pdf',
    });
  });

  it('uses current Dubai location copy without future-relocation language', () => {
    expect(PORTFOLIO_CONTENT.availability).toEqual({
      status: 'Based in Dubai, UAE · Available for opportunities.',
      recruiterMessage:
        'I am based in Dubai and interviewing now for senior frontend and Angular roles across the UAE.',
    });
    expect(PORTFOLIO_CONTENT.experience.find(({ id }) => id === 'toters')?.location).toBe(
      'Remote from Dubai, UAE · Beirut HQ',
    );
    expect(JSON.stringify(PORTFOLIO_CONTENT)).not.toMatch(/relocat|from 12 September 2026/i);
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

  it('uses the verified Toters job title', () => {
    expect(PORTFOLIO_CONTENT.experience.find(({ id }) => id === 'toters')?.role).toBe(
      'Web Engineer',
    );
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
