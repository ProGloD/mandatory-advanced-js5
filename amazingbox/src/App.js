import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import SearchView from "./components/SearchView";
import Favorites from "./components/Favorites";
import LoginDone from "./components/LoginDone";
import { token$ } from "../src/store/authToken";
import { Helmet } from "react-helmet";

function App() {
  const [userToken, updateUserToken] = useState(token$.value);

  useEffect(() => {
    let subscriptionToken = token$.subscribe(token => {
      updateUserToken(token);
    });
    
    return () => {
      subscriptionToken.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div className="App">  
      {!userToken ? null : 
        <header className="nav-header">
          <Helmet>
            <title>AmazingBox</title>
          </Helmet>
          <Link className="home-icon material-icons" to="/">
            home
          </Link>
          <Link className="favorites" to="/favorites">
            <i className="favorites-icon material-icons">star</i>{" "}
            <span className="favorites-text">Favorites</span>
          </Link>
<<<<<<< HEAD
          {/*<span>amazingbox.</span>*/}
=======
          <Link className="search-icon material-icons" to="/search">
          search
          </Link>
          <Logout />
>>>>>>> 7131f5fd5d52d6f44fafab6ed06304355bb2a10f
        </header>
      }
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/search" component={SearchView} />
        <Route path="/auth" component={Login} />
        <Route path="/auth-done" component={LoginDone} />
        </div>
    </Router>
  );
}

export default App;
