import { randomUUID } from "crypto";
import {
  characters,
  literacyQuestions,
  mathQuestions,
  Question,
  shuffleArray,
  TestSession,
} from "./stuff";

const MAX_QUESTIONS_PER_SECTION = 5;

function generateRandomIndexes(max: number, count: number): number[] {
  const indexes = Array.from({ length: max }, (_, i) => i);
  return shuffleArray(indexes).slice(0, count);
}

function getRandomCharacters(
  targetCharacter: (typeof characters)[0],
  count: number,
) {
  const availableCharacters = characters.filter(
    (char) => char.name !== targetCharacter.name,
  );
  return shuffleArray(availableCharacters).slice(0, count);
}

export async function createIQSession(): Promise<TestSession> {
  const sessionId = randomUUID();
  const session: TestSession = {
    id: sessionId,
    currentSection: "brainrot",
    questionIndex: 0,
    answers: [],
    correctAnswers: 0,
    completed: false,
    brainrotQuestions: generateRandomIndexes(characters.length, 5),
    mathQuestions: generateRandomIndexes(mathQuestions.length, 5),
    literacyQuestions: generateRandomIndexes(literacyQuestions.length, 5),
    currentCorrectIndex: null,
  };

  return session;
}

export async function getCurrentQuestion(
  session: TestSession,
): Promise<{ question: Omit<Question, "correctIndex"> } | { error: string }> {
  if (!session) {
    return { error: "Invalid session" };
  }

  if (session.completed) {
    return { error: "Session already completed" };
  }

  const question = generateQuestion(
    session.currentSection,
    session.questionIndex,
    session,
  );

  session.currentCorrectIndex = question.correctIndex;

  const { correctIndex: _, ...safeQuestion } = question;

  return {
    question: safeQuestion,
  };
}

export async function submitAnswer(
  session: TestSession,
  answer: number,
): Promise<
  | {
      completed: boolean;
      nextSection?: string;
      questionIndex: number;
      score?: number;
    }
  | { error: string }
> {
  if (!session) {
    return { error: "Invalid session" };
  }
  if (session.completed) {
    return { error: "Session already completed" };
  }
  if (session.currentCorrectIndex === null) {
    return { error: "No question active or question already answered" };
  }

  const expectedCorrectIndex = session.currentCorrectIndex;
  const isCorrect = expectedCorrectIndex === answer;

  if (isCorrect) {
    session.answers.push(answer);
    session.correctAnswers++;
    session.currentCorrectIndex = null;
    session.questionIndex++;

    if (session.questionIndex >= MAX_QUESTIONS_PER_SECTION) {
      session.questionIndex = 0;
      switch (session.currentSection) {
        case "brainrot":
          session.currentSection = "literacy";
          break;
        case "literacy":
          session.currentSection = "math";
          break;
        case "math":
          session.completed = true;
          session.score = calculateScore(session.correctAnswers);
          break;
      }
    }

    return {
      completed: session.completed,
      nextSection: session.currentSection,
      questionIndex: session.questionIndex,
      score: session.score,
    };
  }

  return {
    error: "Invalid Answer",
  };
}

function calculateScore(correctAnswers: number): number {
  return Math.round((correctAnswers / 15) * 100) + 50;
}

function generateBrainrotQuestion(index: number): Question {
  const targetCharacter = characters[index % characters.length];
  const otherCharacters = getRandomCharacters(targetCharacter, 3);
  const allCharacters = shuffleArray([targetCharacter, ...otherCharacters]);
  const correctIndex = allCharacters.findIndex(
    (char) => char.name === targetCharacter.name,
  );

  const baseUrl =
    "https://raw.githubusercontent.com/outpoot/twoblade/refs/heads/main/website/static/iq/brainrot/images";

  const imageUrls = allCharacters.map(
    (char) => `${baseUrl}/${char.codename}.${char.image_type}`,
  );

  return {
    question: `Gambar mana yang menunjukan ${targetCharacter.name}?`,
    options: [],
    imageUrls,
    correctIndex,
  };
}

function generateMathQuestion(index: number): Question {
  return mathQuestions[index % mathQuestions.length].generate();
}

function generateLiteracyQuestion(index: number): Question {
  const question = literacyQuestions[index % literacyQuestions.length];
  const originalCorrect = question.options[question.correctIndex];
  const shuffledOptions = shuffleArray([...question.options]);

  return {
    question: question.question,
    options: shuffledOptions,
    correctIndex: shuffledOptions.indexOf(originalCorrect),
  };
}

function generateQuestion(
  section: "brainrot" | "literacy" | "math",
  index: number,
  session: TestSession,
): Question {
  switch (section) {
    case "brainrot":
      return generateBrainrotQuestion(session.brainrotQuestions[index]);
    case "literacy":
      return generateLiteracyQuestion(session.literacyQuestions[index]);
    case "math":
      return generateMathQuestion(session.mathQuestions[index]);
  }
}
