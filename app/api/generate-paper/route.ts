import { NextResponse } from "next/server";
import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      className,
      subject,
      topic,
      totalMarks,
      duration,
      questionTypes,
      additionalInstructions,
    } = body;

    const prompt = `
Generate a PROFESSIONAL SCHOOL EXAM PAPER.

STRICT RULES:

- Return ONLY clean printable exam paper text
- No markdown
- No ** symbols
- No bullet points
- No school header
- No subject/class heading
- No time allowed section
- No maximum marks section
- No student details section
- Do NOT use tables
- Keep formatting neat and readable
- SECTION titles MUST be centered
- Divide properly into:
  SECTION A
  SECTION B
  SECTION C
- Add proper spacing between sections
- Add instructions below each section title
- Add marks beside every question
- Add difficulty level beside every question
- Generate questions ONLY from:
  Subject: ${subject}
  Topic/Chapter: ${topic}
- Do not generate questions outside the topic
- Difficulty should match real school exams

QUESTION PAPER DETAILS:

Class: ${className}
Subject: ${subject}
Topic/Chapter: ${topic}
Time Allowed: ${duration}
Maximum Marks: ${totalMarks}

QUESTION REQUIREMENTS:

${questionTypes
  .map(
    (q: any, index: number) =>
      `
SECTION ${String.fromCharCode(65 + index)}

Question Type: ${q.type}
Number of Questions: ${q.count}
Marks Per Question: ${q.marks}
`,
  )
  .join("\n")}

ADDITIONAL INSTRUCTIONS:

${additionalInstructions}

OUTPUT FORMAT EXAMPLE:

                    SECTION A

Multiple Choice Questions

Attempt all questions. Each question carries 1 mark.

1. What is photosynthesis? [1 Mark] [Easy]

2. Which planet is called the Red Planet? [1 Mark] [Easy]


                    SECTION B

Short Answer Questions

Attempt all questions.

3. Explain the process of evaporation. [3 Marks] [Medium]

4. Define gravitational force. [3 Marks] [Medium]


                    SECTION C

Long Answer Questions

5. Explain the water cycle with diagram. [5 Marks] [Hard]


                    ANSWER KEY

1. Photosynthesis is...
2. Mars
3. ...

Generate COMPLETE paper now.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert school question paper generator.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const generatedText = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      paper: generatedText,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Generation failed",
      },
      { status: 500 },
    );
  }
}
