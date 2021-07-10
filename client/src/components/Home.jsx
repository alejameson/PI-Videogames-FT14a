import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGames } from "../actions";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home(){
/* const [state, setState] = useState(""); */
const dispatch = useDispatch(); 

const games = useSelector((state) => state.gamesLoaded);

useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);


/* function handleChange(e){
    setState(e.target.value);
} 

function handleSubmit(e){
    e.preventDefault();
    dispatch(getAllGames());
} 
 */
return (
    <div>
        <div><h1>JUEGOS</h1></div>
        <Link to="/search"><button>BUSCAR JUEGOS</button></Link>
        <ul className = "lista">
            {games.map((game) => 
            <div className = "container">
                <div><img src={game.background_image} alt="" width="350" height="250" /></div>
                <div>{game.name}</div>    
            </div>
            )}
        </ul>
    </div>
)

}