// Quiz.js
import React, { useState, useEffect } from "react";
import "./QuizInterface.css";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../utils/constants";
import axios from "axios";

const QuizInterface = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch questions from your API
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${URL}quiz/${id}`);
        const data = await response.json();
        console.log(data);
        setQuestions(data?.quiz?.questions); // assuming data is an array of questions
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleClick = (option) => {
    setSelectedOption(option);

    // Update userAnswers for the current question
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion._id]: option, // Assuming _id is the unique identifier for questions
    }));
  };

  const handleSubmit = async () => {
    // Add logic to handle the quiz submission
    if (currentQuestionIndex < questions.length - 1) {
      // If there are more questions, move to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
    } else {
      const quizId = id;

      const payload = {
        quizId,
        userAnswers,
      };

      try {
        // Make an API call to submit data using Axios
        const responsePromise = axios.post(`${URL}quiz/submitQuiz`, payload);

        const response = await responsePromise;
        // Access the response data here
        let score = {};
        score["totalQ"] = questions?.length;
        score["correct"] = response?.data?.correctAnswersCount;
        console.log("Submission successful", score);
        navigate("/quizcompleted", { state: score });
      } catch (error) {
        // Handle error
        console.error("Error submitting quiz:", error);
      }
    }
  };

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    // Loading state or end of quiz
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="header">
        <div>{`${currentQuestionIndex + 1}/${questions.length}`}</div>
        <div>Timer</div>
      </div>
      <div className="question-section">
        <h1 className="question">{currentQuestion.questionText}</h1>
      </div>
      <div className="options-section">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            className={`option-button ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => handleClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
      </button>
    </div>
  );
};

export default QuizInterface;
