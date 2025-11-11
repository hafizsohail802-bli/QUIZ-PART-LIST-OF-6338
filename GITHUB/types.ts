export interface ComponentData {
  id: number;
  item_code: string;
  name: string;
  part_number?: string;
  rating?: string;
  category: string;
  panel: string;
  specifications?: string;
  technical_specs?: string;
  pin_in_details?: string;
  pin_out_details?: string;
  usage_details?: string;
  installation_notes?: string;
  safety_warnings?: string;
  manufacturer?: string;
  schematic_image_url?: string;
  physical_image_url?: string;
  pinout_image_url?: string;
  datasheet_url?: string;
  wiring_diagram_url?: string;
  created_at?: string;
  updated_at?: string;
}

export type ComponentImportData = Omit<ComponentData, 'id' | 'created_at' | 'updated_at'>;

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
}

export interface QuizCategory {
  id: number;
  name: string;
  description: string;
}

export type QuestionType = 'multiple_choice' | 'true_false';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizOption {
  text: string;
  image_url?: string;
}

export interface QuizQuestion {
  id: number;
  category_id: number;
  question_text: string;
  question_image_url?: string;
  type: QuestionType;
  options: QuizOption[];
  correct_answer: string;
  difficulty: Difficulty;
}

export interface QuizImportData {
    category: string;
    question_text: string;
    question_image_url?: string;
    type: QuestionType;
    option1: string;
    option2: string;
    option3?: string;
    option4?: string;
    correct_answer: string;
    difficulty?: Difficulty;
}

export interface QuizResult {
  id: number;
  userId: number;
  userName: string;
  quizDate: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  categories: string[];
}

export type QuizResultData = Omit<QuizResult, 'id'>;


export interface ValidationError {
  row: number;
  message: string;
}

export interface StudyMaterial {
  id: number;
  name: string;
  type: 'word' | 'excel';
  content: string; // Base64 encoded content
  createdAt: string;
}