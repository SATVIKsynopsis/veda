import { create } from "zustand";

export interface QuestionSection {
  section: string;
  title: string;
  instructions: string;
  questions: Array<{
    id: string;
    text: string;
    difficulty: "easy" | "medium" | "hard";
    marks: number;
    type: string;
  }>;
}

export interface GeneratedAssignment {
  assignmentId: string;
  title: string;
  instructions: string;
  sections: QuestionSection[];
  totalMarks: number;
  totalQuestions: number;
}

interface AssignmentForm {
  title: string;
  description: string;
  dueDate: string;
  questionTypes: string[];
  numberOfQuestions: number;
  marksPerQuestion: number;
  additionalInstructions: string;
  fileUrl?: string;
  fileName?: string;
}

interface Store {
  form: AssignmentForm;
  generatedAssignment: GeneratedAssignment | null;
  loading: boolean;
  error: string | null;
  success: string | null;

  // Form actions
  updateForm: (updates: Partial<AssignmentForm>) => void;
  resetForm: () => void;

  // Generation actions
  setGeneratedAssignment: (assignment: GeneratedAssignment | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

const initialFormState: AssignmentForm = {
  title: "",
  description: "",
  dueDate: "",
  questionTypes: ["multiple-choice", "short-answer"],
  numberOfQuestions: 5,
  marksPerQuestion: 5,
  additionalInstructions: "",
};

export const useAssignmentStore = create<Store>((set) => ({
  form: initialFormState,
  generatedAssignment: null,
  loading: false,
  error: null,
  success: null,

  updateForm: (updates) =>
    set((state) => ({
      form: { ...state.form, ...updates },
    })),

  resetForm: () =>
    set({
      form: initialFormState,
      generatedAssignment: null,
      error: null,
      success: null,
    }),

  setGeneratedAssignment: (assignment) =>
    set({ generatedAssignment: assignment }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setSuccess: (success) => set({ success }),
}));
