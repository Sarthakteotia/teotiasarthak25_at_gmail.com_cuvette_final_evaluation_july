import React, { useState } from "react";
import { Outlet, Link, redirect, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const Logout = async () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="container">
      {/* <header>
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? "Open" : "<MenuIcon />"}
        </button>
      </header> */}
      <main>
        <aside className={isSidebarOpen ? "open" : ""}>
          <div className="head">
            <h1>QUIZZIE</h1>
          </div>
          <div className="mid">
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/analytics">Analytics</Link>
              </li>
              <li>
                <Link to="/create-quiz">Create Quiz</Link>
              </li>
            </ul>
          </div>
          <div className="base">
            <hr />
            <button className="btnLogout" onClick={Logout}>
              Logout
            </button>
          </div>
        </aside>
        <Outlet />
      </main>
    </div>
  );
}

export default Home;
