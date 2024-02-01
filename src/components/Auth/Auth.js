import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import styles from "./Auth.module.css";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>QUIZZIE</h1>
        </div>
        <div className={styles.btntabs}>
          <button
            className={styles.button}
            onClick={() => handleTabClick("login")}
            style={{
              marginRight: "10px",
              backgroundColor: activeTab === "login" ? "lightblue" : "inherit",
            }}
          >
            Login
          </button>
          <button
            onClick={() => handleTabClick("signup")}
            className={styles.button}
            style={{
              backgroundColor: activeTab === "signup" ? "lightblue" : "inherit",
            }}
          >
            Sign Up
          </button>
        </div>
        <div className={styles.formDiv}>
          {activeTab === "login" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
