import React from 'react';
import './App.css';
import Dropbox from "dropbox";
import Login from "./components/login";
import Home from "./components/home";
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="">Home</Link>

        <Route exact path="/" component={Home}/>
        <Route path="/auth" component={Login} />
      </div>
    </Router>
  );
}

export default App;
