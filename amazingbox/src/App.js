import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import SearchView from "./components/SearchView";
import Favorites from "./components/favorites";
import LoginDone from "./components/loginDone";
import { token$, updateToken } from "../src/store/authToken";
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
          {/*<span>amazingbox.</span>*/}
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
