import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGames } from "../../actions/index";
import { Link } from "react-router-dom";
import Games from "../Games/Games";
import Pagination from "../Pagination/Pagination";
import "./Home.css";

export default function Home(){
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [gamesPerPage] = useState(15);

const dispatch = useDispatch(); 

const games = useSelector((state) => state.gamesLoaded); 

useEffect(() => {
    setLoading(true);
    dispatch(getAllGames());
    setLoading(false);
  }, [dispatch]);

const indexOfLastGame = currentPage * gamesPerPage;
const indexOfFirstGame = indexOfLastGame - gamesPerPage;
const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
const paginate = (pageNumber) => setCurrentPage(pageNumber);
return (
    <div>
       <div><h1>JUEGOS</h1></div>
       <Pagination gamesPerPage={gamesPerPage} totalGames={games.length} paginate={paginate}/>
       {/*  <Link to="/order"><button>ORDENAR JUEGOS</button></Link> */}
       <Games games={currentGames} loading={loading} />
    </div>
)

}