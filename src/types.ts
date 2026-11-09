export type TeachingMode = 'english' | 'hinglish';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  teachingMode?: TeachingMode;
}

export interface KnowledgeTopic {
  id: string;
  category: string;
  title: string;
  summary: string;
  hinglishSummary: string;
  syntax: string;
  exampleCode: string;
  expectedOutput: string;
  explanation: string;
  hinglishExplanation: string;
  analogy: string;
  commonErrors?: string[];
}

export interface DryRunStep {
  stepNumber: number;
  lineNumber: number;
  codeLine: string;
  variables: Record<string, any>;
  output?: string;
  explanation: string;
}

export interface DryRunResult {
  summary: string;
  initialState?: string;
  steps: DryRunStep[];
  finalOutput: string;
  keyTakeaways: string[];
}

export interface DebugResult {
  hasError: boolean;
  errorType: string;
  errorLine: string;
  whyErrorOccurred: string;
  correctedCode: string;
  codeDiffExplanation: string[];
  preventionTips: string[];
  proTip?: string;
}

export interface CodeExplanationResult {
  title: string;
  simpleSummary: string;
  complexity: {
    time: string;
    space: string;
    notes: string;
  };
  lineByLine: Array<{
    lines: string;
    code: string;
    explanation: string;
  }>;
  coreConceptsUsed: string[];
  realWorldAnalogy: string;
  potentialEdgeCases: string[];
  optimizationTip: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface PracticeProblem {
  title: string;
  difficulty: string;
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  constraints?: string;
  examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
  starterCode: string;
  solutionCode: string;
  hints: string[];
  explanation: string;
}

export interface HallmarkSkill {
  id: string;
  name: string;
  category: 'code' | 'learning' | 'debugging' | 'projects';
  tagline: string;
  description: string;
  iconName: string;
  popular?: boolean;
  inputPlaceholder: string;
  presetQueries: string[];
  samplePresetCode?: string;
}
