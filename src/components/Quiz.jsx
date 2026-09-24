import { useState } from "react";
import Button from "./Button";
import BilingualText from "./BilingualText";
import styles from "./Quiz.module.css";

// A simple multiple-choice quiz. Calls onComplete(correctCount) once the
// learner has answered the last question.
function Quiz({ questions, onComplete }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const hasAnswered = selected !== null;
  const isCorrect = hasAnswered && selected === question.correctIndex;

  function handleSelect(optionIndex) {
    if (hasAnswered) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) {
      setCorrectCount((count) => count + 1);
    }
  }

  function handleNext() {
    if (isLast) {
      onComplete(correctCount);
      return;
    }
    setIndex((current) => current + 1);
    setSelected(null);
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.counter}>
        Vraag {index + 1} van {questions.length}
      </p>

      <BilingualText as="h3" af={question.af} />

      <div className={styles.options} role="radiogroup" aria-label={question.af}>
        {question.options.map((option, optionIndex) => {
          let optionClass = styles.option;
          if (hasAnswered && optionIndex === question.correctIndex) {
            optionClass += ` ${styles.correct}`;
          } else if (hasAnswered && optionIndex === selected) {
            optionClass += ` ${styles.incorrect}`;
          }

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected === optionIndex}
              className={optionClass}
              disabled={hasAnswered}
              onClick={() => handleSelect(optionIndex)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <p className={`${styles.feedback} ${isCorrect ? styles.good : styles.bad}`}>
          {isCorrect ? "Reg! (Correct!)" : "Nie heeltemal nie. (Not quite.)"}
        </p>
      )}

      {hasAnswered && (
        <Button onClick={handleNext}>
          {isLast ? "Klaar (Done)" : "Volgende Vraag (Next)"}
        </Button>
      )}
    </div>
  );
}

export default Quiz;
