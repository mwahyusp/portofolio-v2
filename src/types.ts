export type Language = 'id' | 'en';

export type CategoryType = 'Semua' | 'React' | 'Next.js' | 'Interactive Apps' | 'All';

export interface LocalizedText {
  id: string;
  en: string;
}

export interface Project {
  id: string;
  title: LocalizedText;
  category: CategoryType;
  description: LocalizedText;
  detailedDescription?: LocalizedText;
  imageWebp: string;
  imagePng: string;
  liveDemoUrl: string;
  githubUrl?: string;
  tags: string[];
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Framework' | 'Tools';
  level: number; // 0 to 100
  iconName: string;
  description: LocalizedText;
}

export interface LearningJourney {
  title: LocalizedText;
  organization: string;
  period: string;
  description: LocalizedText;
  badge: LocalizedText;
}
