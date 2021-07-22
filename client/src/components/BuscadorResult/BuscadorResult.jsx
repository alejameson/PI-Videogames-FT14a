import React, {useState} from "react";
import { useSelector } from "react-redux";
import Games from "../Games/Games";
import Pagination from "../Pagination/Pagination";
import "./BuscadorResult.css";

export default function BuscadorResult(){
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [gamesPerPage] = useState(15);

const search = useSelector((state) => state.gameSearch);
console.log(search);

const indexOfLastGame = currentPage * gamesPerPage;
const indexOfFirstGame = indexOfLastGame - gamesPerPage;
const currentGames = search.slice(indexOfFirstGame, indexOfLastGame);
const paginate = (pageNumber) => setCurrentPage(pageNumber);

return (
    <div>
        {search != "vacio" ?
           <div> 
            <div><h1>SEARCH GAMES</h1></div>
            <Pagination gamesPerPage={gamesPerPage} totalGames={search.length} paginate={paginate}/>
            <Games games={currentGames} loading={false}/>
           </div> 
            : (
                <div>
                    <img src="https://images.hive.blog/p/62PdCouTvNPD4Ewnt81FpyJK4VTFfLrE49bSu5TkQabrMWnhCxHuC1GHZmpgn74kEmNfG7sXK55siP7adzGc45rdGCCY9a5oRqFzUerSqUe3V33?format=match&mode=fit" alt="" />
                </div>
            )
        }    
    </div>
)

}