import React, { useState } from "react";
import axios from "axios";
import styles from "./LoginForm.module.css";
import { URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(email, password, "email");
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}auth/login`, {
        email,
        password,
      });
      console.log(response, "es");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Redirect to dashboard upon successful login
    } catch (error) {
      console.error(error);
      // Handle login errors (e.g., show error message)
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.emailinput}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.logininput}
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.passwordinput}>
        <label htmlFor="password">Password</label>

        <input
          className={styles.logininput}
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
        <button className={styles.button} type="submit">
          <div>Log In</div>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
