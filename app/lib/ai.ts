interface GenerateQuestionsInput {
  title: string;
  description: string;
  questionTypes: string[];
  numberOfQuestions: number;
  marksPerQuestion: number;
  additionalInstructions: string;
}

export async function generateQuestionsWithAI(input: GenerateQuestionsInput) {
  const {
    title,
    description,
    questionTypes,
    numberOfQuestions,
    marksPerQuestion,
    additionalInstructions,
  } = input;

  // Parse question types and create sections
  const sectionsPerType = Math.ceil(numberOfQuestions / questionTypes.length);
  const sections = [];

  for (let i = 0; i < questionTypes.length; i++) {
    const sectionLabel = String.fromCharCode(65 + i); // A, B, C, etc.
    const questionType = questionTypes[i];
    const sectionQuestions = Math.min(
      sectionsPerType,
      numberOfQuestions - i * sectionsPerType,
    );

    const questions = generateMockQuestions(
      sectionQuestions,
      marksPerQuestion,
      questionType,
    );

    sections.push({
      section: sectionLabel,
      title: `Section ${sectionLabel}`,
      instructions: `Attempt all ${sectionQuestions} ${questionType} questions. Each question carries ${marksPerQuestion} marks.`,
      questions,
    });
  }

  return {
    assignmentTitle: title,
    description,
    instructions: `${additionalInstructions}\n\nTotal Marks: ${numberOfQuestions * marksPerQuestion}`,
    sections,
    totalMarks: numberOfQuestions * marksPerQuestion,
    totalQuestions: numberOfQuestions,
  };
}

function generateMockQuestions(count: number, marks: number, type: string) {
  const sampleQuestions = {
    "multiple-choice": [
      "What is the capital of France?",
      "Which planet is closest to the sun?",
      "What is 2 + 2?",
      "Who wrote Romeo and Juliet?",
      "What is the chemical symbol for gold?",
      "Which continent is the largest?",
      "What year did World War II end?",
      "What is the boiling point of water in Celsius?",
    ],
    "short-answer": [
      "Define photosynthesis.",
      "Explain the water cycle.",
      "What is mitochondria?",
      "Define democracy.",
      "Explain the theory of evolution.",
      "What is the importance of biodiversity?",
      "Define sustainable development.",
      "What is an ecosystem?",
    ],
    essay: [
      "Discuss the impact of technology on education.",
      "Analyze the causes and effects of climate change.",
      "Evaluate the role of media in society.",
      "Discuss the importance of environmental conservation.",
      "Analyze the effects of globalization on local cultures.",
    ],
  };

  const questions: (typeof sampleQuestions)["multiple-choice"] =
    sampleQuestions[type as keyof typeof sampleQuestions] ||
    sampleQuestions["multiple-choice"];

  const difficulties: Array<"easy" | "medium" | "hard"> = [
    "easy",
    "medium",
    "hard",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `q${i + 1}`,
    text: questions[i % questions.length],
    difficulty: difficulties[i % difficulties.length],
    marks,
    type,
  }));
}
