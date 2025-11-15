export interface ProjectLink {
  readonly label: string;
  readonly url: string;
  readonly type: 'live' | 'github' | 'case-study' | string;
}

export interface ProjectSummary {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly techStack: readonly string[];
  readonly highlights: readonly string[];
  readonly links?: readonly ProjectLink[];
}
