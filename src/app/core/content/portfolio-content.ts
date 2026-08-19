export interface PortfolioLink {
  readonly label: string;
  readonly url: string;
}

export interface PortfolioMetric {
  readonly value: string;
  readonly label: string;
  readonly detail: string;
}

export interface PortfolioExperience {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly dates: string;
  readonly location: string;
  readonly summary: string;
  readonly contributions: readonly string[];
  readonly technologies: readonly string[];
}

export interface PortfolioCaseStudy {
  readonly id: string;
  readonly title: string;
  readonly context: string;
  readonly description: string;
  readonly contributions: readonly string[];
  readonly technologies: readonly string[];
  readonly link?: PortfolioLink;
}

export interface PortfolioSkillGroup {
  readonly id: string;
  readonly title: string;
  readonly skills: readonly string[];
  readonly primary?: boolean;
}

export interface PortfolioLanguage {
  readonly language: string;
  readonly proficiency: string;
  readonly credential?: string;
}

export interface PortfolioContent {
  readonly identity: {
    readonly name: string;
    readonly role: string;
    readonly summary: string;
    readonly experience: string;
    readonly portrait: {
      readonly src: string;
      readonly alt: string;
      readonly width: number;
      readonly height: number;
    };
  };
  readonly availability: {
    readonly status: string;
    readonly recruiterMessage: string;
  };
  readonly contact: {
    readonly email: string;
    readonly emailHref: string;
    readonly phone: string;
    readonly phoneHref: string;
    readonly phoneAvailability: string;
    readonly website: string;
    readonly linkedin: PortfolioLink;
    readonly github: PortfolioLink;
  };
  readonly resume: {
    readonly available: boolean;
    readonly path: string;
  };
  readonly metrics: readonly PortfolioMetric[];
  readonly about: readonly string[];
  readonly experience: readonly PortfolioExperience[];
  readonly caseStudies: readonly PortfolioCaseStudy[];
  readonly skillGroups: readonly PortfolioSkillGroup[];
  readonly education: {
    readonly institution: string;
    readonly degree: string;
    readonly graduation: string;
  };
  readonly languages: readonly PortfolioLanguage[];
}

export const PORTFOLIO_CONTENT = {
  identity: {
    name: 'Ahmad Alshaib',
    role: 'Web Engineer · Angular Specialist',
    summary:
      'I build and modernize production Angular applications, improving frontend architecture, performance, testing, and maintainability across merchant and operations platforms.',
    experience: '5+ years of professional software engineering experience',
    portrait: {
      src: 'assets/images/profile.webp',
      alt: 'Ahmad Alshaib, Web Engineer and Angular Specialist',
      width: 350,
      height: 350,
    },
  },
  availability: {
    status: 'In Dubai, UAE from 12 September 2026 · Available for opportunities.',
    recruiterMessage:
      'I am interviewing now for senior frontend and Angular roles in Dubai, Abu Dhabi, and across the UAE.',
  },
  contact: {
    email: 'ahmad.alshaib@outlook.com',
    emailHref: 'mailto:ahmad.alshaib@outlook.com',
    phone: '+971 52 423 7060',
    phoneHref: 'tel:+971524237060',
    phoneAvailability: 'Active from 12 September 2026',
    website: 'ahmadalshaib.com',
    linkedin: {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/ahmad-alshaib/',
    },
    github: {
      label: 'GitHub',
      url: 'https://github.com/Sol501',
    },
  },
  resume: {
    available: true,
    path: '/Ahmad-Alshaib-Web-Engineer-Resume.pdf',
  },
  metrics: [
    {
      value: '40-50%',
      label: 'performance improvement',
      detail: 'on production Angular application and dashboard work',
    },
    {
      value: '~90%',
      label: 'fewer production regressions',
      detail: 'associated with stronger automated testing in relevant areas',
    },
    {
      value: '2,000+',
      label: 'merchants served',
      detail: 'by merchant-facing production systems at Toters',
    },
  ],
  about: [
    'I am a Web Engineer with 5+ years of professional software engineering experience, specializing in Angular and TypeScript. I work on production merchant tools, administration platforms, and real-time operational interfaces where maintainable architecture and predictable delivery matter.',
    'My work spans modernizing legacy AngularJS systems, structuring shared frontend libraries, improving performance and testing, and refining user experience with product managers, designers, backend engineers, and frontend peers. I take features from requirements through implementation, validation, and production support.',
  ],
  experience: [
    {
      id: 'toters',
      company: 'Toters Delivery App',
      role: 'Web Engineer',
      dates: 'February 2023-Present',
      location: 'Remote from Syria · Beirut HQ',
      summary: 'Production Angular work across merchant-facing and internal operations products.',
      contributions: [
        'Contributed to modernization from legacy AngularJS applications toward modern Angular architecture and reusable shared libraries.',
        'Built merchant and administration workflows used by more than 2,000 merchants, including real-time interfaces backed by WebSockets and REST APIs.',
        'Improved frontend performance by approximately 40-50% across relevant application and dashboard work.',
        'Strengthened unit testing and delivery practices, helping relevant areas reach approximately 80% coverage and reducing production regressions by roughly 90%.',
        'Contributed to paid Highlights and advertising functionality associated with approximately 5% revenue uplift.',
        'Worked with product managers and designers to take production features from requirements through delivery.',
      ],
      technologies: [
        'Angular',
        'AngularJS',
        'TypeScript',
        'RxJS',
        'Nx',
        'Jest',
        'WebSockets',
        'REST APIs',
      ],
    },
    {
      id: 'albaraka',
      company: 'Albaraka Bank Syria',
      role: 'Software Developer',
      dates: 'November 2021-February 2023',
      location: 'Damascus, Syria',
      summary:
        'Internal banking and operations software with an emphasis on traceable delivery and workflow automation.',
      contributions: [
        'Introduced on-premises GitLab workflows and helped migrate legacy projects into managed version control.',
        'Developed an ATM inventory and audit dashboard that parsed ATM logs and helped automate reconciliation-related processes.',
        'Built an internal recruitment and applicant-tracking system for candidate screening and workflow visibility.',
        'Implemented automated end-to-end tests for important HR and back-office workflows.',
      ],
      technologies: ['Angular', 'TypeScript', 'GitLab', 'CI/CD', 'Cypress', 'REST APIs'],
    },
  ],
  caseStudies: [
    {
      id: 'toters-merchant',
      title: 'Toters Merchant Self-Serve Platform',
      context: 'Private production work · Toters Delivery App',
      description:
        'Merchant-facing Angular tools supporting self-service and operational workflows for more than 2,000 merchants.',
      contributions: [
        'Contributed Angular architecture and production features for a platform serving more than 2,000 merchants.',
        'Built maintainable workflows around merchant operations, API integrations, and shared frontend capabilities.',
      ],
      technologies: ['Angular', 'TypeScript', 'RxJS', 'Nx', 'REST APIs'],
    },
    {
      id: 'toters-highlights',
      title: 'Toters Highlights / Ads',
      context: 'Private production work · Toters Delivery App',
      description:
        'Paid placement functionality for merchant visibility, delivered inside an established production platform.',
      contributions: [
        'Contributed frontend implementation and integration work for Highlights and advertising experiences.',
        'The product work was associated with approximately 5% revenue uplift.',
      ],
      technologies: ['Angular', 'TypeScript', 'RxJS', 'REST APIs'],
    },
    {
      id: 'syrian-manufacturing',
      title: 'Syrian Manufacturing',
      context: 'Damascus Chamber of Industry · Public website',
      description:
        'Angular administration and dashboard work supporting manufacturing data, content workflows, and public-facing experiences.',
      contributions: [
        'Improved frontend load performance and delivered new administration features.',
        'Implemented interactive data visualizations and refined dashboard workflows.',
      ],
      technologies: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'REST APIs', 'Data visualization'],
      link: {
        label: 'Visit Syrian Manufacturing',
        url: 'https://www.syrianmanufacturing.com/',
      },
    },
  ],
  skillGroups: [
    {
      id: 'frontend',
      title: 'Frontend',
      primary: true,
      skills: [
        'Angular',
        'TypeScript',
        'JavaScript',
        'RxJS',
        'Angular Signals',
        'HTML',
        'CSS / SCSS',
      ],
    },
    {
      id: 'architecture-web',
      title: 'Architecture & Web',
      skills: [
        'Modular frontend architecture',
        'Shared libraries',
        'REST APIs',
        'WebSockets',
        'Responsive design',
        'Accessibility',
        'Web performance',
      ],
    },
    {
      id: 'testing',
      title: 'Testing',
      skills: ['Jest', 'Cypress'],
    },
    {
      id: 'tooling-delivery',
      title: 'Tooling & Delivery',
      skills: ['Git', 'GitHub', 'GitLab', 'GitHub Actions', 'CI/CD', 'Nx', 'Vite / Webpack'],
    },
  ],
  education: {
    institution: 'Arab International University',
    degree: 'Bachelor of Engineering in Artificial Intelligence',
    graduation: 'Graduated August 2021',
  },
  languages: [
    { language: 'Arabic', proficiency: 'Native' },
    {
      language: 'English',
      proficiency: 'Professional proficiency',
      credential: 'IELTS 7.5',
    },
  ],
} as const satisfies PortfolioContent;
