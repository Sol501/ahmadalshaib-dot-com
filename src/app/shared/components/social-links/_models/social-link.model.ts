export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly url: string;
  readonly type: SocialLinkTypeEnum;
}

export enum SocialLinkTypeEnum {
  GitHub = 'github',
  LinkedIn = 'linkedin'
}
