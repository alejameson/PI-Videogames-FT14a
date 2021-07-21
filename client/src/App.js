import React from "react";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import BuscadorResult from "./components/BuscadorResult/BuscadorResult"
import NavBar from "./components/NavBar/NavBar";
import Create from "./components/Create/Create";
import Detail from "./components/Detail/Detail";
import './App.css';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Route exact path ="/" component = {Landing} />
      <Route path ="/home" component = {Home} />
      <Route path ="/search" component = {BuscadorResult} />
      <Route path ="/create" component = {Create} />
      <Route exact path ="/game/:id" 
        render = {({ match }) => <Detail id={match.params.id}/>}
      />
    </React.Fragment>
  );
}

export default App;
