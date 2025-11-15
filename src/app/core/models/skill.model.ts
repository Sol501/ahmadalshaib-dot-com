export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface SkillGroup {
  readonly id: string;
  readonly label: string;
  readonly skills: readonly Skill[];
}
