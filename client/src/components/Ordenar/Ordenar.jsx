import React from "react";
import "./Ordenar.css";

const Ordenar = ({games}) => {
    return (
        <div>
            <ul className = "lista">
            {games.map((game) => 
            <div className = "container">
                <div><img src={game.img} alt="" width="350" height="250" /></div>
                <div>{game.name}</div>   
                <div>{game.genres}</div> 
            </div>
            )}
        </ul>
        </div>
    )
}

export default Ordenar;