import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { OrderGames } from "../../actions/index";
import { Link } from "react-router-dom";
import "./Ordenar.css";

export default function Ordenar(){
/* const [state, setState] = useState(""); */
const dispatch = useDispatch(); 

const order = useSelector((state) => state.gameOrder);

useEffect(() => {
    dispatch(OrderGames());
  }, [dispatch]);

return (
    <div>
        <div><h1>JUEGOS</h1></div>
        {/* <Link to="/search"><button>ORDENAR JUEGOS</button></Link> */}
        <ul className = "lista">
            {order.map((game) => 
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