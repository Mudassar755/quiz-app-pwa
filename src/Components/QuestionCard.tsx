import React, { useState } from "react";
import { QuizType } from "../Types/QuizTypes";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Button,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "left",
    marginLeft: "20px",
    marginRight: "20px",
    backgroundColor: "#D5D5D5",
    color: "#000",
    height: "70vh",
  },
  btnContainer: {
    marginTop: "20px",
  },
}));

const QuestionCard: React.FC<QuizType> = ({ question, options, callback }) => {
  const classes = useStyles();

  let [selectedAns, setSelectedAns] = useState("");
  let [isSelected, setSelected] = useState(false);

  const handleSelection = (ev: any) => {
    setSelectedAns(ev.target.value);
    setSelected(true);
  };
  const next = () => {
    setSelected(false);
  };
  console.log(isSelected);
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper className={classes.paper}>
            <div className="question">
              <h4>{question}</h4>
            </div>

            <form
              onSubmit={(e: React.FormEvent<EventTarget>) =>
                callback(e, selectedAns)
              }
              // className="question-form"
            >
              {options.map((opt: string, ind: number) => {
                return (
                  <div key={ind}>
                    <FormControl component="fieldset">
                      <RadioGroup name="opt" value={opt}>
                        <FormControlLabel
                          value={opt}
                          control={<Radio color="primary" required />}
                          label={opt}
                          checked={selectedAns === opt}
                          onChange={handleSelection}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                );
              })}
              <div className={classes.btnContainer}>
                <Button variant="contained" type="submit" onClick={next}>
                  Next
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuestionCard;
