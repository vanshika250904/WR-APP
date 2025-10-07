export interface UserProfile {
  age: number;
  gender: string;
  goals: string[];
}

export interface WellnessTip {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  category: string;
  detailedExplanation?: string;
  steps?: string[];
}

export type Screen = 'profile' | 'tips' | 'detail' | 'favorites';
