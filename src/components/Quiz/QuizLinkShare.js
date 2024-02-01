// ShareModal.js
import React, { useEffect, useState } from "react";
import "./QuizLinkShare.css";

function QuizShareLink({ isOpen, onClose, quizID }) {
  console.log(quizID);
  const [link, setLink] = useState("");
  useEffect(() => {
    // Update link when quizID changes
    if (quizID) {
      setLink(window.location.host + `/quiz/${quizID}`);
    }
  }, [quizID]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(
      () => {
        alert("Link copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="modal-header">Share This Link</h2>
        <input
          className="modal-input"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          readOnly
        />
        <button className="modal-button" onClick={copyToClipboard}>
          Share
        </button>
        <button className="modal-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default QuizShareLink;
