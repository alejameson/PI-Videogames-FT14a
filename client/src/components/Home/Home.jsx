import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGames, OrderGames } from "../../actions/index";
import { Link } from "react-router-dom";
import Games from "../Games/Games";
import Pagination from "../Pagination/Pagination";
import "./Home.css";

export default function Home(){
const [active, setActive] = useState("Aleatory"); 
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [gamesPerPage] = useState(15);

const dispatch = useDispatch(); 

const games = useSelector((state) => state.gamesLoaded); 
const order = useSelector((state) => state.gameOrder);

const ordenAZ = "AZ";
const ordenZA = "ZA";

/* const gamesOrder = order.sort(function(a,b) {
  var x = a.name.toLowerCase();
  var y = b.name.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
});  */

useEffect(() => {
    setLoading(true);
    dispatch(getAllGames());
    setLoading(false);
  }, [dispatch]);

/* useEffect(() => {
  dispatch(OrderGames()); 
}, [dispatch]);  */

const indexOfLastGame = currentPage * gamesPerPage;
const indexOfFirstGame = indexOfLastGame - gamesPerPage;
const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
const currentOrderGames = order.slice(indexOfFirstGame, indexOfLastGame); 
const paginate = (pageNumber) => setCurrentPage(pageNumber);
return (
    <div>
       <div><h1>JUEGOS</h1></div>
       <nav className="ordenamiento">
          <button className="btn1" onClick={() => setActive("Aleatory")}>ALEATORY</button>
          <button className="btn2" onClick={() => {dispatch(OrderGames(ordenAZ)); setActive("OrderAZ")}}>ORDER AZ</button>
          <button className="btn3" onClick={() => {dispatch(OrderGames(ordenZA)); setActive("OrderZA")}}>ORDER ZA</button>
       </nav>
       <Pagination gamesPerPage={gamesPerPage} totalGames={games.length} paginate={paginate}/>
       <div>
         {active === "Aleatory" && <Games games={currentGames} loading={loading} />}
         {active === "OrderAZ" && <Games games={currentOrderGames} loading={loading} />} 
         {active === "OrderZA" && <Games games={currentOrderGames} loading={loading} />}
       </div> 
    </div>
)

}