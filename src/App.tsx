import React, { useState, useEffect } from "react";
import "./App.css";
import { getQuiz } from "./Services/quizService";
import firebase from './firebase';
import { Quiz } from "./Types/QuizTypes";
import QuestionCard from "./Components/QuestionCard";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Container,
  CircularProgress,
  Typography,
  Button,
} from "@material-ui/core";
import ResultCard from "./Components/ResultCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#000",
    textAlign: "center",
    height:"100vh",
    "& h1": {
      color: "#D5D5D5",
      textShadow: "4px 2px 5px #917373",
      padding: "20px 0",
    },
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "80vh",
    margin: "50px 0",
    backgroundColor: "#D5D5D5",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  quizStarter: {
    // padding: theme.spacing(2),
    textAlign: "center",
    height: "300px",
    width:"300px",
    backgroundColor: "#fff",
    color: "#000",
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    justifyContent: "center",
    
  },
  loader: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    padding: "100px 0",
  },
}));

// let TOTAL_QUESTIONS = 1;

function App() {
  const classes = useStyles();
  let [startQuiz, setStartQuiz] = useState(false)
  let [questions, setQuestions] = useState<Quiz[]>([]);
  let [questionNo, setQuestionNo] = useState(0);
  // let [score, setScore] = useState(0);
  let [quizCompleted, setQuizCompleted] = useState(false);
  let [correctAnswers, setCorrectAnswers] = useState(0);
  let [wrongAnswers, setWrongAnswers] = useState(0);

  useEffect(() => {
    async function fetchData() {
      // const questions: Quiz[] = await getQuiz(TOTAL_QUESTIONS, "easy");
      const questions: Quiz[] = await getQuiz();
      setQuestions(questions);
    }
    fetchData();

    const sendNotification = async () => {
      const messaging = firebase.messaging();
      messaging.requestPermission().then(() => {
        return messaging.getToken()
      }).then((token) => {
        console.log("token", token);
      })
    }

    sendNotification()
  }, [startQuiz]);
  const quizStarter = () => {
    setStartQuiz(true)
    setQuizCompleted(false);
    setCorrectAnswers(0);
    setWrongAnswers(0)
    setQuestionNo(0)
    
  }
  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: Quiz = questions[questionNo];



    if (userAns === currentQuestion.correct_answer) {
      setCorrectAnswers(++correctAnswers);
    }
    if (userAns !== currentQuestion.correct_answer) {
      setWrongAnswers(++wrongAnswers);
    }

    if (questionNo !== questions.length - 1) setQuestionNo(++questionNo);
    else {
      setQuizCompleted(true);
      setStartQuiz(false)
    }
  };

  if (!questions.length)
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    );

  if (quizCompleted) {
    return (
      <div className={classes.root}>
        <Container>
              <Paper className={classes.paper}>
        <ResultCard correct_answer={correctAnswers} incorrect_answers={wrongAnswers} question_length={questions.length} restartTest={quizStarter}  />
        </Paper>
        </Container>
      </div>
    );
  }
  if (startQuiz) {
    return (
      <div className={classes.root}>
        <h1>General Quiz</h1>
        <QuestionCard
          options={questions[questionNo].option}
          question={questions[questionNo].question}
          callback={handleSubmit}
        />
      </div>
    )
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.quizStarter}>
        <Typography variant="h4" gutterBottom>
General Quiz App
        </Typography>
      <Button variant="contained" color="secondary" onClick={quizStarter}>Start Quiz</Button>
      </Paper>
    </div>

  );
}

export default App;
