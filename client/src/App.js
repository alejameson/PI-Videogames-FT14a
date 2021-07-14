import React from "react";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import BuscadorResult from "./components/BuscadorResult/BuscadorResult"
import NavBar from "./components/NavBar/NavBar";
import './App.css';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Route exact path ="/" component = {Landing} />
      <Route path ="/home" component = {Home} />
      <Route path ="/search" component = {BuscadorResult} />
    </React.Fragment>
  );
}

export default App;
