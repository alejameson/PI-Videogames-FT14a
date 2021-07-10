import React from "react";
import { Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Buscador from "./components/Buscador";
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Route exact path ="/" component = {Landing} />
      <Route path ="/home" component = {Home} />
      <Route path ="/search" component = {Buscador} />
    </React.Fragment>
  );
}

export default App;
