import { Quiz, QuestionType } from "./../Types/QuizTypes";

const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const getQuiz = async (
  // totalQuestions: number,
  // level: string
): Promise<Quiz[]> => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple`
    // `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`
  );
  let { results } = await res.json();
  
  const quiz: Quiz[] = results.map((questionObj: QuestionType) => {
    return {
      question: questionObj.question,
      answer: questionObj.correct_answer,
      correct_answer: questionObj.correct_answer,
      option: shuffleArray(
        questionObj.incorrect_answers.concat(questionObj.correct_answer)
      ),
    };
  });
  return quiz;
};
