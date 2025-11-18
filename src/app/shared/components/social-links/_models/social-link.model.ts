export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly url: string;
  readonly type: 'linkedin' | 'github' | string;
}
