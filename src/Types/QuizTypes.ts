import React from "react";

export type QuestionType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type Quiz = {
  question: string;
  answer: string;
  option: string[];
  correct_answer: string;
};

export type QuizType = {
  question: string;
  options: string[];
  callback: (e: React.FormEvent<EventTarget>, ans: string) => void;
};

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type Result = {
  correct_answer: number;
  incorrect_answers: number;
  question_length: number;
  restartTest: Function
};
