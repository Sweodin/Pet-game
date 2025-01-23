import React, { useState, useEffect } from "react";
import "../../style/games/mathGame.css";
import Cat from "../../assets/home-cat.svg";
import items from "../../assets/form/math-items.js";
import {
  EllipseBlue,
  EllipseGreen,
  EllipseRed,
} from "../../assets/form/math-items.js";

const MathGame = ({ onPointsEarned, points, setPoints }) => {
  /*----- Stores the current question object, containing the question text and answer details. -----*/
  const [question, setQuestion] = useState({});
  /*----- Stores the user's currently selected answer. Initialized to "null" to indicate no selection. -----*/
  const [selectedAnswer, setSelectedAnswer] = useState("null");
  /*----- Stores feedback message to display to the user after they answer a question. -----*/
  const [feedback, setFeedback] = useState("");
  /*----- Stores the user's current score. -----*/
  const [score, setScore] = useState(0);
  /*----- Stores the number of lives the user has remaining. -----*/
  const [lives, setLives] = useState(3);
  /*----- Stores the number of questions the user has answered. -----*/
  const [questionCount, setQuestionCount] = useState(0);
  /*----- Stores the remaining time for the current question. -----*/
  const [timeLeft, setTimeLeft] = useState(10);
  /*----- Stores the game over state, true if the game is over, false otherwise. -----*/
  const [gameOver, setGameOver] = useState(false);
  /*----- Stores the previous question object, useful for preventing duplicate questions. -----*/
  const [previousQuestion, setPreviousQuestion] = useState(null);
  /*----- Stores the array of answer options for the current question. -----*/
  const [answerOptions, setAnswerOptions] = useState([]);

  /*----- Generates a new question with random quantities of two items, ensuring the correct answer is different from the previous question. -----*/
  const generateQuestion = () => {
    let item1, item2, num1, num2;
    const egg = items.find((item) => item.name === "Egg");
    const avokado = items.find((item) => item.name === "Avokado");
    do {
      item1 = egg;
      item2 = avokado;
      num1 = Math.floor(Math.random() * 5) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
    } while (num1 + num2 === previousQuestion?.correctAnswer);

    const newQuestion = {
      item1,
      item2,
      num1,
      num2,

      correctAnswer: num1 + num2,
    };
    setPreviousQuestion(newQuestion);
    setQuestion(newQuestion);
    setSelectedAnswer(null);
    setFeedback("");
    generateAnswerOptions(newQuestion.correctAnswer);
  };

  /*----- Generates an array of 3 unique answer options, including the correct answer, and shuffles them. -----*/

  const generateAnswerOptions = (correctAnswer) => {
    const options = new Set([correctAnswer]);
    while (options.size < 3) {
      const randomOption = Math.floor(Math.random() * 10) + 1;
      options.add(randomOption);
    }
    const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);
    setAnswerOptions(shuffledOptions);
  };

  /*----- Handles the user's answer selection, updates the score if correct, and triggers the onPointsEarned callback. -----*/

  const handleAnswerSelection = (selected) => {
    setSelectedAnswer(selected);
    if (selected === question.correctAnswer) {
      const earnedPoints = 10; // Points earned

      setScore((prevScore) => prevScore + earnedPoints); // Update score with earned points

      // Update points after correct answer, only pass earned points to the parent
      setPoints((prevPoints) => {
        const updatedPoints = prevPoints + earnedPoints; // Update points
        if (onPointsEarned) {
          onPointsEarned(earnedPoints); // Pass only the earned points, not total points
        }
        return updatedPoints;
      });

      setFeedback("Correct! 🎉");
      setQuestionCount((prevCount) => prevCount + 1);
    } else {
      setFeedback("Incorrect, try again! ❌");
      setLives((prev) => prev - 1);
    }
    setTimeLeft(10);
    setTimeout(() => {
      setFeedback("");
      generateQuestion();
    }, 1500);
  };


  /*----- Resets the game state to initial values and generates a new question.   -----*/

  const resetGame = () => {
    setLives(3);
    setScore(0);
    setQuestionCount(0);
    setGameOver(false);
    setTimeLeft(10);
    setFeedback("");
    setPreviousQuestion(null);
    generateQuestion();
  };

  /*----- Generates the first question when the component mounts. -----*/

  useEffect(() => {
    generateQuestion();
  }, []);

  /*----- Checks if the game is over based on lives or question count, and sets the gameOver state accordingly. -----*/

  useEffect(() => {
    if (lives === 0 || questionCount === 10) {
      setGameOver(true);
    }
  }, [lives, questionCount]);

  /*----- Manages the timer, decrements timeLeft every second, and handles game over or time out scenarios. -----*/

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      setLives((prev) => prev - 1);
      setTimeLeft(10);
      generateQuestion();
    }
  }, [timeLeft, gameOver]);

  return (
    <div>
      <div className="game-frame">
        <h1 className="game-title">Let's play!</h1>
        <div className="math-game-container">
          <h2 className="math-game-title">Math Game</h2>
          <div className="math-game-stats">
            <div className="math-game-score">Score: {score}</div>
            <div className="math-game-lives">Lives: {lives}</div>
            <div className="math-game-timer">Time: {timeLeft}s</div>
            <div className="math-game-questions">
              Question: {questionCount}/10
            </div>
          </div>
          {!gameOver ? (
            <div className="math-game-question-container">
              <p className="math-game-question">
                {Array.from({ length: question.num1 }, (_, index) => (
                  <img
                    key={`item1-${index}`}
                    src={question.item1.image}
                    alt={question.item1.name}
                    className="math-game-item-image"
                  />
                ))}
                +
                {Array.from({ length: question.num2 }, (_, index) => (
                  <img
                    key={`item2-${index}`} 
                    src={question.item2.image}
                    alt={question.item2.name}
                    className="math-game-item-image"
                  />
                ))}
                = ?
              </p>
              <div className="math-game-answer-options">
                {answerOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelection(option)}
                    className={`math-game-answer-ellipse ${
                      selectedAnswer === option ? "selected" : ""
                    }`}
                  >
                    {/* dangerouslySetInnerHTML={{ __html: option.svg }} */}
                    <img
                      src={
                        index === 0
                          ? EllipseBlue
                          : index === 1
                          ? EllipseGreen
                          : EllipseRed
                      }
                      alt={option}
                    />
                    <span>{option}</span>
                  </div>
                ))}
                {/*  {feedback && <div className="feedback">{feedback}</div>} */}
              </div>
            </div>
          ) : (
            <div className="math-game-over">
              <h2>Game Over!</h2>
              <p>Final Score: {score}</p>
              <p>You answered {questionCount} out of 10 questions correctly</p>
              <button onClick={resetGame} className="math-game-button">
                Play Again
              </button>
            </div>
          )}
          <p
            className={`math-game-feedback ${
              feedback.includes("Correct") ? "correct" : "incorrect"
            }`}
          >
            {feedback}
          </p>
        </div>
        <img src={Cat} alt="cute pixel cat" className="game-cat" />
      </div>
    </div>
  );
};

export default MathGame;
