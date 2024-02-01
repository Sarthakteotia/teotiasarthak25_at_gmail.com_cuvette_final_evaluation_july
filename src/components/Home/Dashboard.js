import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  useEffect(() => {
    console.log("useEffect Called");
    fetchData();
    fetchAllData();
  }, []);
  const [mapData, setMapData] = useState();
  const [allQuiz, setallQuiz] = useState();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const data = await fetch("http://localhost:3000/api/quiz/getQuiz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Include the Authorization header with the token
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await data.json();
    setMapData(json);
    console.log(json, "json");
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

  const totalSubmissionCount = mapData?.quizzes.reduce((accumulator, quiz) => {
    const submitQuizRecord = allQuiz?.submitQuizRecords.find(
      (record) => record.quiz === quiz._id
    );
    const count = submitQuizRecord?.count || 0;
    return accumulator + count;
  }, 0);
  const QuizDiv = ({ name, impressions, createdAt }) => {
    return (
      <div className="rectangleDiv">
        <div className="titlediv">
          <h4>{name}</h4>
          <p>{impressions ? impressions : 0}</p>
        </div>
        <div className="date">Created At : {createdAt}</div>
      </div>
    );
  };
  return (
    <div className="container">
      <div className="upper-container">
        <div className="info-box-1">
          <div className="upper-info-box">
            <div>{mapData?.quizCount}</div>
            <div>Quiz</div>
          </div>
          <div className="box-lower">Created</div>
        </div>
        <div className="info-box-2">
          <div className="upper-info-box">
            <div>{mapData?.questionsCount}</div>
            <div>Questions</div>
          </div>
          <div>Created</div>
        </div>
        <div className="info-box-3">
          <div className="upper-info-box">
            <div>{totalSubmissionCount}</div>
            <div>Total</div>
          </div>
          <div>Impressions</div>
        </div>
      </div>
      <div className="trend">
        <h1>Trending Quiz</h1>
        <div className="cardContainer">
          {mapData?.quizzes.map((quiz) => {
            const submitQuizRecord = allQuiz?.submitQuizRecords.find(
              (record) => record.quiz === quiz._id
            );

            return (
              <QuizDiv
                key={quiz?._id}
                name={quiz?.title}
                impressions={submitQuizRecord?.count}
                createdAt={new Date(quiz?.createdAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
