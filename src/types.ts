export type CareerTrack = 'all' | 'it-support' | 'frontend' | 'qa-testing';

export interface Project {
  id: string;
  title: string;
  category: 'Manual QA Testing' | 'Frontend Development';
  track: 'qa-testing' | 'frontend';
  shortDescription: string;
  fullDescription: string;
  image: string;
  githubUrl: string;
  liveDemoUrl?: string;
  technologies: string[];
  purpose: string;
  tags?: string[];
  mainFeatures: string[];
  qaArtifacts?: {
    totalTestCases: number;
    regressionScenarios: number;
    bugReportsCount: number;
    intentionalDefects: number;
    testPlanSummary: string;
    rtmSummary: string;
    sampleTestCases: {
      id: string;
      title: string;
      module: string;
      precondition: string;
      testSteps: string[];
      expectedResult: string;
      type: 'Positive' | 'Negative' | 'Boundary';
    }[];
    sampleBugReports: {
      id: string;
      title: string;
      severity: 'Critical' | 'Major' | 'Medium' | 'Minor';
      priority: 'High' | 'Medium' | 'Low';
      stepsToReproduce: string[];
      expectedResult: string;
      actualResult: string;
      rootCause?: string;
      suggestedFix?: string;
    }[];
  };
}

export interface QADiscipline {
  id: string;
  title: string;
  badge: string;
  description: string;
  tags: string[];
}

export interface QADefectItem {
  id: string;
  title: string;
  severity: 'Critical' | 'Major' | 'Medium' | 'Minor';
  priority: 'High' | 'Medium' | 'Low';
  module: string;
  stepsToReproduce: string[];
  expectedResult: string;
  actualResult: string;
  rootCause: string;
  suggestedFix: string;
}

export interface WorkExperience {
  role: string;
  companyOrContext: string;
  period: string;
  duration?: string;
  contractType?: string;
  location?: string;
  type: 'employment' | 'career-break';
  summary: string;
  highlights: string[];
  skillsDemonstrated: string[];
  relatedTracks: CareerTrack[];
}

export interface SkillCategory {
  title: string;
  track: CareerTrack;
  description: string;
  skills: {
    name: string;
    context: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  notes?: string;
  status: 'Completed' | 'Continuous Learning';
}

export interface AdditionalRepository {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  purpose: string;
}

