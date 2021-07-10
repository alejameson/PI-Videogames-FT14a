import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchGames } from "../actions";
import { Link } from "react-router-dom";
import "./Buscador.css";

export default function Buscador(){
const [state, setState] = useState("");
const dispatch = useDispatch(); 

const search = useSelector((state) => state.gameSearch);

function handleChange(e){
    setState(e.target.value);
} 

function handleSubmit(e){
    e.preventDefault();
    dispatch(SearchGames(state));
} 

return (
    <div>
        <Link to="/home"><h1>HOME</h1></Link>
        <div><h1>VIDEOGAMES</h1></div>
        <form onSubmit = {(e) => handleSubmit(e)}>
            <div>
                <label htmlFor="title"> JUEGO</label>
                <input 
                   type="text"
                   id="title"
                   autoComplete="off"
                   value={state}
                   onChange={(e) => handleChange(e)}
                />
                <button type="submit">BUSCAR</button>
            </div>
        </form>
        <ul className = "listasearch">
            {search.map((gamesearch) => 
            <div>
                <div><img src={gamesearch.background_image} alt="" width="350" height="250" /></div>
                <div>{gamesearch.name}</div>
            </div>
            )}
        </ul>
    </div>
)

}