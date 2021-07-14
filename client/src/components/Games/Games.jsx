import React from "react";
import "./Games.css";

const Games = ({games, loading}) => {
    if (loading){
        return <h1>Loading...</h1>;
    }
    console.log(loading);
    return (
        <div>
        <ul className = "lista">
            {games.map((game) => 
            <div className = "container">
                <div><img src={game.img || "https://www.trecebits.com/wp-content/uploads/2020/11/Error-404.jpg"} alt="" width="350" height="250" /></div>
                <div>{game.name}</div>   
                <div>{game.genres}</div> 
            </div>
            )}
        </ul>
        </div>
    )
}

export default Games;