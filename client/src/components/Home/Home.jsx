import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGames, OrderGames, FilterGames, getGenres, CreatorGames } from "../../actions/index";
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
const allgenres = useSelector((state) => state.genres);
const filter = useSelector((state) => state.gamesFilter);
const creator = useSelector((state) => state.gamesCreator);



const ordenAZ = "AZ";
const ordenZA = "ZA";
const ratingMayor = "MAYOR";
const ratingMenor = "MENOR";

useEffect(() => {
    setLoading(true);
    dispatch(getAllGames());
    dispatch(getGenres())
    setLoading(false);
  }, [dispatch]);


function handleOnFilterChange(e) {
  setActive("Filter");
  dispatch(FilterGames(e.target.value));
}  

function handleOnCreatorChange(e) {
  setActive("Creator");
  dispatch(CreatorGames(e.target.value));
}

const indexOfLastGame = currentPage * gamesPerPage;
const indexOfFirstGame = indexOfLastGame - gamesPerPage;
const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
const currentOrderGames = order.slice(indexOfFirstGame, indexOfLastGame); 
const currentFilterGames = filter.slice(indexOfFirstGame, indexOfLastGame);
const currentCreatorGames = creator.slice(indexOfFirstGame, indexOfLastGame);
const paginate = (pageNumber) => setCurrentPage(pageNumber);

return (
    <div className="home">
       <div className="opciones">
          <div className="filtrado">
              <label htmlFor='filter' className="palabrita">Filter By Genre</label>
              <div className="filter1"> 
                <select name='filter' onChange={handleOnFilterChange}  className="filtergen" value="All">
                    <option value="All" className="optall">All Games</option>
                    {allgenres.map((genre) =>(
                        <option value={genre.name} className="optgen">{genre.name}</option>
                    ))}
                </select>
              </div>  
         </div>
         <div className="contord">
            <div className="ordenamiento">
                <div className="ordertit"><h3>Order By...</h3></div>
                <button className="btn1" onClick={() => setActive("Aleatory")}>ALL ALEATORY</button>
                <button className="btn2" onClick={() => {dispatch(OrderGames(ordenAZ)); setActive("OrderAZ")}}>A-Z 🡳</button>
                <button className="btn3" onClick={() => {dispatch(OrderGames(ordenZA)); setActive("OrderZA")}}>Z-A 🡱</button>
                <button className="btn4" onClick={() => {dispatch(OrderGames(ratingMayor)); setActive("RatingMayor")}}>Higher Rating ⭐</button>
                <button className="btn5" onClick={() => {dispatch(OrderGames(ratingMenor)); setActive("RatingMenor")}}>Lower Rating ☆</button>
            </div>
         </div>
         <div className="creadores">
              <label htmlFor="filcreator" className="palabrita2">Filter By Creator</label>
              <div className="filter2">
                <select name="filcreator" onChange={handleOnCreatorChange} className="filtercrea">
                  <option value="All" className="crea-all">All Games</option>
                  <option value="mygames" className="crea-my">My Games</option>
                  <option value="apigames" className="crea-api">Api Games</option>
                </select>
              </div>  
         </div>
       </div>
       {active === "Aleatory" ? (
          <div>
            <Pagination gamesPerPage={gamesPerPage} totalGames={games.length} paginate={paginate}/>
          </div>
          ) : active === "OrderAZ" ? (
            <div>
            <Pagination gamesPerPage={gamesPerPage} totalGames={order.length} paginate={paginate}/>
            </div>
          ) : active === "OrderZA" ? (
            <div>
            <Pagination gamesPerPage={gamesPerPage} totalGames={order.length} paginate={paginate}/>
            </div> 
          ) : active === "RatingMayor" ? (
            <div>
            <Pagination gamesPerPage={gamesPerPage} totalGames={order.length} paginate={paginate}/>
            </div>
          ) : active === "RatingMenor" ? (
            <div>
            <Pagination gamesPerPage={gamesPerPage} totalGames={order.length} paginate={paginate}/>
            </div> 
          ) : active === "Filter" ? (
            <div>
              <Pagination gamesPerPage={gamesPerPage} totalGames={filter.length} paginate={paginate}/>
            </div>
          ) : active === "Creator" ? (
            <div>
              <Pagination gamesPerPage={gamesPerPage} totalGames={creator.length} paginate={paginate}/>
            </div>
          ): (
            <div>
              <Pagination gamesPerPage={gamesPerPage} totalGames={games.length} paginate={paginate}/>
            </div>  
          )}  
       {games.length ? (
       <div>
         {active === "Aleatory" && <Games games={currentGames} loading={loading} />}
         {active === "OrderAZ" && <Games games={currentOrderGames} loading={loading} />} 
         {active === "OrderZA" && <Games games={currentOrderGames} loading={loading} />}
         {active === "RatingMayor" && <Games games={currentOrderGames} loading={loading} />}
         {active === "RatingMenor" && <Games games={currentOrderGames} loading={loading} />}
         {active === "Filter" && <Games games={currentFilterGames} loading={loading} />}
         {active === "Creator" && <Games games={currentCreatorGames} loading={loading} />}
       </div>
       ) : (<div className="loadinghome">
              <img src="https://cdn2.scratch.mit.edu/get_image/gallery/3887263_170x100.png" width="250" height="230"/>
            </div>
            )
       } 
    </div>
)

}