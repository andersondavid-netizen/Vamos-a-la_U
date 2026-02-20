
export interface User {
  fullName: string;
  username: string;
  age: number;
  school: string;
  course: string;
}

export type QuestionType = 'text' | 'select' | 'radio' | 'number' | 'verification' | 'fluency';

export interface Question {
  id: string;
  text: string;
  options?: { label: string; value: string }[];
  type: QuestionType;
  correctAnswer?: string;
  category?: string; // C, H, A, S, I, D, E para CHASIDE
  subCategory?: 'verbal' | 'espacial' | 'raciocinio' | 'numerica' | 'fluidez'; // Para PMA
  imagePrompt?: string; // Para generar imágenes con IA
}

export interface TestPart {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number; // en segundos
}

export interface Test {
  id: string;
  title: string;
  description: string;
  parts?: TestPart[];
  questions: Question[];
}

export interface TestResult {
  testId: string;
  scores: Record<string, number>;
  maxScores: Record<string, number>;
  interpretation: string;
}

export enum AppStep {
  LANDING = 'LANDING',
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  SURVEY = 'SURVEY',
  DASHBOARD = 'DASHBOARD',
  TEST_MODE = 'TEST_MODE',
  RESULTS = 'RESULTS'
}
