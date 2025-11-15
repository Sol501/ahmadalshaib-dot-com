export interface ExperienceSummary {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly location?: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly achievements: readonly string[];
  readonly techFocus?: readonly string[];
}
