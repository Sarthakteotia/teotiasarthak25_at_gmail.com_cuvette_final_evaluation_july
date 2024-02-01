import React, { useState } from "react";
import "./QuizForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../../utils/constants";
import QuizLinkShare from "../Quiz/QuizLinkShare";

function QuizForm({ isOpen, onClose, quizName, quizType }) {
  const maxQuestions = 5;
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", ""],
      timer: "no-timer",
      answer: null,
    },
  ]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();
  const [quizID, setQuizID] = useState();
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    if (questions.length < maxQuestions) {
      setQuestions([
        ...questions,
        {
          questionText: "",
          options: ["", ""],
          timer: "no-timer",
          answer: null,
        },
      ]);
      setActiveQuestionIndex(questions.length);
    }
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
      setActiveQuestionIndex((prevIndex) =>
        Math.min(prevIndex, newQuestions?.length - 1)
      );
    }
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options.length < 4) {
      newQuestions[questionIndex].options.push("");
      setQuestions(newQuestions);
    }
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options.length > 2) {
      newQuestions[questionIndex].options = newQuestions[
        questionIndex
      ].options.filter((_, i) => i !== optionIndex);
      setQuestions(newQuestions);
    }
  };
  function extractIdFromString(inputString) {
    const regex = /([0-9a-fA-F]{24})/; // Assuming the ID is a 24-character hexadecimal string
    const match = inputString.match(regex);

    if (match) {
      return match[0];
    }

    return null; // Return null if no match is found
  }
  //  const navigate = useNavigate
  const handleCreateQuiz = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Implement quiz creation logic here
    console.log(questions);
    let payload = {
      xyz: quizName,
      questions: questions,
    };
    delete payload["timer"];
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      // const response = await axios.post(`${URL}quiz/create-quiz`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // Include the Authorization header with the token
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: payload,
      // });
      const response = await axios.post(`${URL}quiz/create-quiz`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "es post");
      setIsShareModalOpen(true);
      let id = extractIdFromString(response?.data?.message);
      setQuizID(id);
      // navigate("/");
    } catch (error) {
      console.error(error);
      // Handle login errors (e.g., show error message)
    }
    // onClose();
  };
  console.log(quizID);
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <QuizLinkShare
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          navigate("/dashboard");
        }}
        quizID={quizID}
      />
      <div className="modal-content">
        <form onSubmit={handleCreateQuiz}>
          <div className="question-tabs">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`question-tab ${
                  index === activeQuestionIndex ? "active" : ""
                }`}
                onClick={() => setActiveQuestionIndex(index)}
              >
                {index + 1}
                {questions.length > 1 && (
                  <button
                    type="button"
                    className="modal-button"
                    onClick={() => removeQuestion(activeQuestionIndex)}
                  >
                    &#10006;
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addQuestion()}>
              &#43;
            </button>
          </div>
          <div className="question-container">
            <h2 className="modal-header">Question {activeQuestionIndex + 1}</h2>
            <input
              className="modal-input"
              type="text"
              placeholder="Question Statement"
              value={questions[activeQuestionIndex]?.questionText}
              onChange={(e) =>
                handleQuestionChange(activeQuestionIndex, e.target.value)
              }
            />
            <div className="modal-label">Options</div>
            {questions[activeQuestionIndex]?.options?.map(
              (option, optionIndex) => (
                <div key={optionIndex}>
                  <div className="modal-radio">
                    <input
                      type="radio"
                      name={`correctAnswer-${activeQuestionIndex}`}
                      checked={
                        questions[activeQuestionIndex].answer ===
                        questions[activeQuestionIndex].options[optionIndex]
                      }
                      onChange={() => {
                        const newQuestions = [...questions];
                        newQuestions[activeQuestionIndex].answer =
                          newQuestions[activeQuestionIndex].options[
                            optionIndex
                          ];
                        setQuestions(newQuestions);
                      }}
                    />
                    <input
                      className="modal-input"
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(
                          activeQuestionIndex,
                          optionIndex,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  {questions[activeQuestionIndex]?.options?.length > 2 && (
                    <button
                      className="modal-button"
                      onClick={() =>
                        removeOption(activeQuestionIndex, optionIndex)
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
              )
            )}
            {questions[activeQuestionIndex]?.options?.length < 4 && (
              <button
                className="modal-button"
                type="button"
                onClick={() => addOption(activeQuestionIndex)}
              >
                Add Option
              </button>
            )}
            <div className="modal-label">Timer</div>
            <select
              className="modal-select"
              value={questions[activeQuestionIndex]?.timer}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[activeQuestionIndex].timer = e.target.value;
                setQuestions(newQuestions);
              }}
            >
              <option value="5">5 Seconds</option>
              <option value="10">10 Seconds</option>
              <option value="no-timer">No Timer</option>
            </select>
            <br />
          </div>
          <br />
          <button className="modal-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="modal-button">
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuizForm;
