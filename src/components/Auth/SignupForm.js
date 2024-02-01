import axios from "axios";
import React, { useState } from "react";
import { URL } from "../../utils/constants";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return alert("Passwords must match!"); // Replace with proper error handling
      }
      // ... existing code for sending sign up data
      console.log(name, email, password, "hehehehehe ");
      const response = await axios.post(`${URL}auth/register`, {
        name,
        email,
        password,
      });
      console.log(response, "esew");
      window.alert("Login using resgiterd Id ");
    } catch (error) {
      // ... existing error handling
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>

      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">Email Address:</label>

      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>

      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="confirmPassword">Confirm Password:</label>

      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
