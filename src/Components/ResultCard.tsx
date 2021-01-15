import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
 import {Result} from '../Types/QuizTypes'
const useStyles = makeStyles({
    root: {
    //   maxWidth: 345,
    width:'50%',
    padding:"20px",
    textAlign:"center"
    },
    resultContent: {
        textAlign:"left"
    }
  });

const ResultCard: React.FC<Result> = ({correct_answer, incorrect_answers, question_length, restartTest}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
             Result Card
            </Typography>
            <Typography variant="h5" color="textSecondary" component="p">
            {(correct_answer / question_length) * 100 < 70 ? "You Are Failed" : "Congratulation!"}
            </Typography>
            <Typography variant="h6" gutterBottom >
                  You final score is
                  <b> {(correct_answer / question_length) * 100} %</b> <br />
                  Correnct Answers <b>{correct_answer}</b>
                  <br />
                  Wrong Answers <b>{incorrect_answers}</b>
                </Typography>
                <Button variant="contained" color="primary" onClick={() => restartTest()}>
                  {(correct_answer / question_length) * 100 < 70 ? "Try Again" : "New Test"}
                  </Button>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
      </Card>
    )
}

export default ResultCard
