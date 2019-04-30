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
        <header className="nav-header">
            <Link className="home-icon material-icons" to="/">
              home
            </Link>
        </header>

        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/auth" component={Login} />
        <Route path="/auth-done" component={LoginDone} />
      </div>
    </Router>
  );
}

export default App;
