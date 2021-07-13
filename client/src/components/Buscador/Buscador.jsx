import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchGames } from "../../actions/index";
/* import { Link } from "react-router-dom"; */
import { withRouter } from "react-router-dom";
import "./Buscador.css";

export function Buscador(props){
const [state, setState] = useState("");
const dispatch = useDispatch(); 

/* const search = useSelector((state) => state.gameSearch); */

function handleChange(e){
    setState(e.target.value);
} 

function handleSubmit(e){
    e.preventDefault();
    dispatch(SearchGames(state));
    props.history.push("/search");
    setState("");
} 

return (
    <div>
        <div className = "Titulo"><h1>VIDEOGAMES</h1></div>
        <form onSubmit = {(e) => handleSubmit(e)}>
            <div>
                <label htmlFor="title"> JUEGO</label>
                <input 
                   type="text"
                   id="title"
                   autoComplete="on"
                   placeholder="Search..."
                   value={state}
                   onChange={(e) => handleChange(e)}
                />
                <button type="submit">BUSCAR</button>
            </div>
        </form>
    </div>
)
}

export default withRouter(Buscador);