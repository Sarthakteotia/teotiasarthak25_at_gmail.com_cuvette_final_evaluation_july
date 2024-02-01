import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import Auth from "../components/Auth/Auth";
import Home from "../components/Home/Home";
import PrivateRoute from "./PrivateRoute";
import LoginForm from "../components/Auth/LoginForm";
import Dashboard from "../components/Home/Dashboard";
import Analytics from "../components/Home/Analytics";
import CreateQuiz from "../components/Home/CreateQuiz";
import QuizInterface from "../components/Quiz/QuizInterface";
import QuizComplete from "../components/Quiz/QuizComplete";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="/dashboard" index element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Route>
      <Route
        path="/auth"
        element={<Auth />}
        loader={() => {
          const token = localStorage.getItem("token");
          console.log(token, "okenroute");
          if (token) {
            return redirect("dashboard");
          }
          return null;
        }}
      >
        <Route path="" loader={() => redirect("login")} />
        <Route path="login" element={<Auth />} />
      </Route>
      <Route>
        <Route path="/quiz/:id" element={<QuizInterface />} />
        <Route path="quizcompleted" element={<QuizComplete />} />
      </Route>
    </>
  )
);
