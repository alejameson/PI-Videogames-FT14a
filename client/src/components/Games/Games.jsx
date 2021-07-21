import React from "react";
import { Link } from "react-router-dom";
import "./Games.css";

const Games = ({games, loading}) => {
    console.log(loading)
    if (loading){
        return <h1>Loading...</h1>;
    }
    
    return (
        <div>
        <ul className = "lista">
            {games.map((game) => 
            <div className = "container">
                <div><img src={game.img || "https://www.trecebits.com/wp-content/uploads/2020/11/Error-404.jpg"} alt="" width="350" height="250" /></div>
                <div className="cardinfo">
                    <div className="cardtit">
                        {game.name.length < 27? 
                            <div>
                                <h2>{game.name.charAt(0).toUpperCase() + game.name.slice(1)}</h2>
                            </div> : (
                            <div>
                                <h2>{game.name.slice(0,22) + " ..."}</h2>
                            </div>
                        )}
                    </div>   

                    <div className="cardgen">{game.genres.map(e => e.name).join()}</div>

                    <div className="cardrat">⭐ {game.rating}</div>
                    <div className="learn"> 
                        <Link to={`/game/${game.id}`}><button className="btnlearn">Learn More</button></Link>
                    </div> 
                </div>
            </div>
            )}
        </ul>
        </div>
    )
}

export default Games;