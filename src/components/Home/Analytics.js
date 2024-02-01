import React, { useState, useEffect } from "react";
import "./Analytics.css";
import edit from "../../assests/uil_edit.png";
import deleteImg from "../../assests/delete.png";
import share from "../../assests/share.png";
import { all } from "axios";
import DeleteModal from "./DeleteModal";

const Analytics = () => {
  const [quizData, setQuizData] = useState([]);
  const [allQuiz, setallQuiz] = useState();
  const [deleteQuiz, setDeleteQuiz] = useState(false);
  const [QuizID, setQuizID] = useState(false);

  useEffect(() => {
    // Fetch quiz data from your API

    const fetchQuizData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/quiz/getQuiz", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include the Authorization header with the token
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setQuizData(data); // Assuming your API returns an array of quiz data
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    const fetchAllData = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      const data = await fetch("http://localhost:3000/api/quiz/getAllQuiz", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include the Authorization header with the token
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await data.json();
      setallQuiz(json);
      console.log(json, "json");
    };

    fetchQuizData();
    fetchAllData();
  }, []); // Empty dependency array to ensure the effect runs only once
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.host + `/quiz/${QuizID}`)
      .then(
        () => {
          alert("Link copied to clipboard!");
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
  };
  return (
    <div className="containerAnalytics">
      <h1>Quiz Analysis</h1>
      <DeleteModal
        deleteQuiz={deleteQuiz}
        quizzId={QuizID}
        closeModal={setDeleteQuiz}
      />

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Quiz Name</th>
              <th>Created On</th>
              <th>Impression</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quizData?.quizzes?.map((quiz, index) => {
              const submitQuizRecord = allQuiz?.submitQuizRecords?.find(
                (record) => record.quiz === quiz._id
              );
              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{index + 1}</td>
                  <td>{quiz.title}</td>{" "}
                  {/* Replace with the actual property from your API response */}
                  <td>
                    {new Date(quiz.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    {submitQuizRecord?.count ? submitQuizRecord?.count : 0}
                  </td>{" "}
                  {/* Replace with the actual property from your API response */}
                  <td>
                    <img
                      src={edit}
                      onClick={() => {
                        window.alert("This feature is in progress");
                      }}
                      alt="Edit"
                    />
                    <img
                      src={deleteImg}
                      onClick={() => {
                        setDeleteQuiz(true);

                        setQuizID(quiz._id);
                      }}
                      alt="Delete"
                    />
                    <img src={share} onClick={copyToClipboard} alt="Share" />
                  </td>
                  <td>Question Wise Analysis</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
