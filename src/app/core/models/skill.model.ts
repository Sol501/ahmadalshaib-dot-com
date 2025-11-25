export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  readonly icon?: string;
}

export interface SkillGroup {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly skills: readonly Skill[];
}
