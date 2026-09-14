export type Language = 'id' | 'en';

export type CategoryType = 'Semua' | 'React' | 'Next.js' | 'Interactive Apps' | 'QA & Testing' | 'All';

export interface LocalizedText {
  id: string;
  en: string;
}

export interface CaseStudyMetric {
  label: LocalizedText;
  value: string;
  description: LocalizedText;
}

export interface CaseStudyDecision {
  title: LocalizedText;
  description: LocalizedText;
  tags?: string[];
}

export interface CaseStudy {
  problemContext: LocalizedText;
  technicalChallenges: LocalizedText[];
  architecturalDecisions: CaseStudyDecision[];
  keyMetrics: CaseStudyMetric[];
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
  caseStudy?: CaseStudy;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Framework' | 'Backend' | 'Database & Cloud' | 'Tools' | 'QA & Testing';
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

export interface WorkExperienceItem {
  company: string;
  location: string;
  role: LocalizedText;
  period: string;
  highlights: LocalizedText[];
  achievements?: LocalizedText;
}

export interface EducationItem {
  institution: string;
  degree: LocalizedText;
  field?: LocalizedText;
  period: string;
  type: 'degree' | 'course';
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}
