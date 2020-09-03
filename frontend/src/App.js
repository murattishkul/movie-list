import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import MovieLists from "./Components/MovieLists/MovieLists";
import MovieList from "./Components/MovieList/MovieList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Router>
        <Switch>
          <Route path={`/list`} component={MovieList} />
          <Route exact path="/" component={MovieLists} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
