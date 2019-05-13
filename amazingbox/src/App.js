import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Favorites from "./components/favorites";
import LoginDone from "./components/loginDone";
import "../src/components/ItemMenu/menuPopUp.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="nav-header">
            <Link className="home-icon material-icons" to="/">
              home
            </Link>
            <Link className="favorites" to="/favorites">
              <i className="favorites-icon material-icons">star</i> <span className="favorites-text">Favorites</span>
            </Link>
        </header>

        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/auth" component={Login} />
        <Route path="/auth-done" component={LoginDone} />
      </div>
    </Router>
  );
}

export default App;
