import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
import Login from "./components/login";
import Home from "./components/home";
import LoginDone from "./components/loginDone";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link className="material-icons" to="/">
                home
              </Link>
            </li>
          </ul>
        </nav>

        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Login} />
        <Route path="/auth-done" component={LoginDone} />
      </div>
    </Router>
  );
}

export default App;
