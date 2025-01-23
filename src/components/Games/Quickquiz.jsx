import React, { useState, useEffect } from "react";
import "../../style/games/quickQuiz.css";
import Cat from "../../assets/home-cat.svg";

const QuickQuiz = ({ setPoints, setPlayerPoints }) => {
  const triviaQuestions = [
    {
      question: "What color is a banana?",
      options: ["Red", "Green", "Yellow", "Blue"],
      correct: "Yellow",
    },
    {
      question: "What sound does a cow make?",
      options: ["Moo", "Baa", "Woof", "Meow"],
      correct: "Moo",
    },
    {
      question: "How many days are there in a week?",
      options: ["5", "6", "7", "8"],
      correct: "7",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: "4",
    },
    {
      question: "What is the color of the sun?",
      options: ["Yellow", "Blue", "Green", "Purple"],
      correct: "Yellow",
    },
    {
      question: "Which animal barks?",
      options: ["Cat", "Dog", "Bird", "Fish"],
      correct: "Dog",
    },
    {
      question: "How many legs does a chicken have?",
      options: ["2", "4", "6", "8"],
      correct: "2",
    },
    {
      question: "What is the opposite of up?",
      options: ["Down", "Left", "Right", "Back"],
      correct: "Down",
    },
    {
      question: "What do you drink that comes from a cow?",
      options: ["Milk", "Juice", "Water", "Soda"],
      correct: "Milk",
    },
    {
      question: "What shape is a wheel?",
      options: ["Square", "Circle", "Triangle", "Rectangle"],
      correct: "Circle",
    },
    {
      question: "What is the name of the frozen water?",
      options: ["Ice", "Snow", "Rain", "Hail"],
      correct: "Ice",
    },
    {
      question: "Which animal lives in water and has gills?",
      options: ["Fish", "Bird", "Elephant", "Lion"],
      correct: "Fish",
    },
    {
      question: "What color are strawberries?",
      options: ["Red", "Green", "Yellow", "Blue"],
      correct: "Red",
    },
    {
      question: "Which day comes after Friday?",
      options: ["Thursday", "Saturday", "Sunday", "Monday"],
      correct: "Saturday",
    },
    {
      question: "What do you use to brush your teeth?",
      options: ["Comb", "Toothbrush", "Spoon", "Towel"],
      correct: "Toothbrush",
    },
    {
      question: "Which fruit is red and often found in pies?",
      options: ["Apple", "Banana", "Grape", "Peach"],
      correct: "Apple",
    },
    {
      question: "What is the name of the baby chicken?",
      options: ["Calf", "Cub", "Chick", "Puppy"],
      correct: "Chick",
    },
    {
      question: "How many fingers do you have on one hand?",
      options: ["3", "4", "5", "6"],
      correct: "5",
    },
    {
      question: "What color are leaves in the summer?",
      options: ["Green", "Red", "Yellow", "Blue"],
      correct: "Green",
    },
    {
      question: "Which vehicle has wings and can fly?",
      options: ["Car", "Bicycle", "Airplane", "Boat"],
      correct: "Airplane",
    },
    {
      question: "How many legs does a spider have?",
      options: ["6", "8", "10", "12"],
      correct: "8",
    },
    {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Tokyo", "Seoul", "Bangkok"],
      correct: "Tokyo",
    },
    {
      question: "What do rabbits love to eat?",
      options: ["Carrots", "Fish", "Bread", "Berries"],
      correct: "Carrots",
    },
    {
      question: "What color is the sky on a clear day?",
      options: ["Red", "Green", "Blue", "Yellow"],
      correct: "Blue",
    },
    {
      question: "What animal is known for saying 'meow'?",
      options: ["Dog", "Cat", "Cow", "Duck"],
      correct: "Cat",
    },
    {
      question: "Which fruit is yellow and is a monkey's favorite?",
      options: ["Apple", "Banana", "Grapes", "Orange"],
      correct: "Banana",
    },
    {
      question: "What do you call a baby dog?",
      options: ["Puppy", "Kitten", "Calf", "Cub"],
      correct: "Puppy",
    },
    {
      question: "What shape has 4 equal sides?",
      options: ["Circle", "Triangle", "Square", "Rectangle"],
      correct: "Square",
    },
    {
      question: "Which one of these animals can fly?",
      options: ["Lion", "Penguin", "Eagle", "Elephant"],
      correct: "Eagle",
    },
    {
      question: "What color are most grasshoppers?",
      options: ["Red", "Green", "Blue", "Yellow"],
      correct: "Green",
    },
    {
      question: "Which of these is a popular superhero with a red suit?",
      options: ["Iron Man", "Spider-Man", "Superman", "Batman"],
      correct: "Spider-Man",
    },
    {
      question: "What do you call the person who helps you when you're sick?",
      options: ["Teacher", "Doctor", "Baker", "Farmer"],
      correct: "Doctor",
    },
    {
      question: "Which animal has a long neck?",
      options: ["Elephant", "Giraffe", "Kangaroo", "Panda"],
      correct: "Giraffe",
    },
  ];

  // Function to get a random question index
  const getRandomQuestion = () => {
    return Math.floor(Math.random() * triviaQuestions.length);
  };

  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion()); // Tracks the current question index
  const [selectedOption, setSelectedOption] = useState(""); // Tracks the selected option
  const [feedback, setFeedback] = useState(""); // Feedback for the answer
  const [score, setScore] = useState(0); // User's score
  const [timer, setTimer] = useState(10); // Timer for each question
  const [lives, setLives] = useState(3); // Game lives
  const [questions, setQuestions] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false); // Game over state
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false); // Flag to prevent multiple submissions

  const onPointsEarned = (points) => {
    setScore(score + points); // Adds points to the score
  };

  // Handles the answer submission when an option is clicked
  const handleAnswerSelection = (option) => {
    if (isGameOver || isAnswerSubmitted) return; // Prevent multiple submissions and game over state

    setSelectedOption(option); // Set the selected option
    setIsAnswerSubmitted(true); // Prevent more selection after submission

    const correctAnswer = triviaQuestions[currentQuestion].correct;

    if (option === correctAnswer) {
      setFeedback("Correct! 🎉");
      onPointsEarned(10); // Earn points for correct answer, passing only earned points
      setQuestions((prevQuestions) => prevQuestions + 1);

      // if questions === 10 game over
      if (questions + 1 === 10) {
        setIsGameOver(true);
        setFeedback("Well done! You answered all questions!");
      }
      // Update points globally by passing only earned points
      setPoints((prevPoints) => prevPoints + 10);
      setPlayerPoints((prevPlayerPoints) => prevPlayerPoints + 10);
    } else {
      setFeedback(`Incorrect! The correct answer was ${correctAnswer}. ❌`);
      setLives(lives - 1);
      // if lives is zero stop the game
      if (lives - 1 === 0) {
        setIsGameOver(true);
        setFeedback("Game Over! ❌");
        return;
      }
    }

    setTimeout(() => {
      if (!isGameOver) {
        setFeedback("");
        setSelectedOption(""); // Reset selected option
        setCurrentQuestion(getRandomQuestion()); // Set new question
        setTimer(10); // Reset timer for next question
      }
      setIsAnswerSubmitted(false); // Allow for answer submission again
    }, 1000); // Short delay before resetting for the next question
  };


  // Effect to manage the countdown timer
  useEffect(() => {
    if (isGameOver) return; // Stop timer if game over

    if (timer === 0) {
      // If timer hits 0, move to the next question
      handleAnswerSelection(""); // Handle timeout like an answer selection
      return; // Prevents the timer from continuing to count down
    }

    // Set interval to decrease the timer every second
    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clean up interval on component unmount or when timer is 0
    return () => clearInterval(timerId);
  }, [timer, isGameOver]); // Dependency array ensures the effect runs when the timer changes

  return (
    <div>
      <div className="game-frame">
        <h1 className="game-title">Let's Play!</h1>
        <div className="quiz-container">
          <h2 className="quiz-title">Quick Quiz Challenge</h2>
          <div className="game-status">
            <div className="quiz-score">Score: {score}</div>
            <div className="quiz-game-timer">
              Time: {timer}s {/* Display remaining time */}
            </div>
            <div className="quiz-game-lives">
              Lives: {lives} / 3 {/* Display remaining life */}
            </div>
            <div className="quiz-game-questions">
              Questions: {questions} / 10 {/* Display remaining questions */}
            </div>
          </div>
          <div className="quiz-question-container">
            <p className="quiz-question">
              {triviaQuestions[currentQuestion].question}{" "}
              {/* Display the current question */}
            </p>
            <div className="quiz-options">
              {/* Map over the options and display buttons */}
              {triviaQuestions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelection(option)} // Set the selected option and submit
                  className={`quiz-option-button ${
                    selectedOption === option ? "selected" : ""
                  }`} // Highlight selected option
                  disabled={isAnswerSubmitted} // Disable options after answer submission
                >
                  {option} {/* Option text */}
                </button>
              ))}
            </div>
          </div>
          <p
            className={`quiz-feedback ${
              feedback.includes("Correct") ? "correct" : "incorrect"
            }`}
          >
            {feedback} {/* Display feedback */}
          </p>
        </div>
        <img src={Cat} alt="cute pixel cat" className="game-cat" />{" "}
        {/* Display cat image */}
      </div>
    </div>
  );
};

export default QuickQuiz;
