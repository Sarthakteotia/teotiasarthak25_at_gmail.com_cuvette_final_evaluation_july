import React from "react";
import styles from "./deletequiz.module.css";
import axios from "axios";
import { URL } from "../../utils/constants";

export default function DeleteModal({ deleteQuiz, quizzId, closeModal }) {
  const handleDelete = () => {
    const quizId = quizzId;

    const jwToken = localStorage.getItem("token");
    if (!jwToken) return alert("Your are not logged in");

    axios
      .delete(`${URL}quiz/${quizId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwToken}`,
        },
      })
      .then((res) => {
        console.log(res.status, "res");

        closeModal(false);
        window.location.reload();
        return alert("Quiz Deleted");
      })
      .catch((err) => {
        return alert("Something went wrong");
      });
  };
  if (!deleteQuiz) {
    return null;
  }
  console.log(closeModal, "setDeleteQuiz");
  return (
    <>
      <div className={styles.container}>
        <h1>
          Are you confirm you <br /> want to delete ?
        </h1>
        <div className={styles.buttons}>
          <button onClick={handleDelete} className={styles.confirm}>
            Confirm Delete
          </button>
          <button onClick={() => closeModal(false)} className={styles.cancle}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
