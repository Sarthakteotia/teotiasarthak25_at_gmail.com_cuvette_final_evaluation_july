import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateQuiz.css";
import QuizForm from "./QuizForm";

function CreateQuiz() {
  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("Q&A");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const navigate = useNavigate();
  const onClose = () => {
    setIsModalOpen(false);
    navigate("/dashboard");
  };
  const handleCreate = () => {
    // Implement quiz creation logic here
    if (isNameValid) {
      console.log({ quizName, quizType, isSecondModalOpen });
      setIsModalOpen(false);
      setIsSecondModalOpen(true);
    } else {
      alert("Please enter a valid quiz name.");
    }
  };
  console.log(isModalOpen, "isModalOpen");
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setQuizName(newName);
    setIsNameValid(newName.trim() !== "");
  };

  return (
    <>
      <QuizForm
        isOpen={isSecondModalOpen}
        quizName={quizName}
        quizType={quizType}
        onClose={() => {
          setIsSecondModalOpen(false);
          navigate("/dashboard");
        }}
      />
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 5,
              minWidth: "300px",
            }}
          >
            <h2>Create Quiz</h2>
            <input
              className="logininput"
              type="text"
              required
              placeholder="Quiz Name"
              value={quizName}
              onChange={handleNameChange}
            />
            <br />
            <div className="radioBlock">
              <h3>Quiz Type</h3>
              <label>
                <input
                  className="radio"
                  type="radio"
                  value="Q&A"
                  checked={quizType === "Q&A"}
                  onChange={() => setQuizType("Q&A")}
                />
                Q&A
              </label>
              <label>
                <input
                  className="radio"
                  type="radio"
                  value="Poll"
                  checked={quizType === "Poll"}
                  onChange={() => setQuizType("Poll")}
                />
                Poll
              </label>
            </div>
            <br />
            <button onClick={onClose}>Cancel</button>
            <button disabled={!isNameValid} onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateQuiz;
