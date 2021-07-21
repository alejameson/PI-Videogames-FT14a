import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchGames } from "../../actions/index";
/* import { Link } from "react-router-dom"; */
import { withRouter } from "react-router-dom";
import Lupita from "../../Lupita.png";
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
        <form onSubmit = {(e) => handleSubmit(e)}>
            <div className="buscando">
            <button type="submit" className ="btnsearch">🔍︎</button>
                <input 
                   className="inputsearch" 
                   type="text"
                   id="title"
                   autoComplete="on"
                   placeholder="  Search Game..."
                   value={state}
                   onChange={(e) => handleChange(e)}
                />
            </div>
        </form>
    </div>
)
}

export default withRouter(Buscador);