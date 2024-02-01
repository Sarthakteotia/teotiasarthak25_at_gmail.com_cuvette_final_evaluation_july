import React from "react";
import { useLocation } from "react-router-dom";

const QuizComplete = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <div>Congrats quiz is completed</div>
      <div>image</div>
      <div>
        Your Score is {location.state.correct}/{location.state.totalQ}
      </div>
    </div>
  );
};

export default QuizComplete;
