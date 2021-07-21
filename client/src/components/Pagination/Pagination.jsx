import { number } from "prop-types";
import React from "react";
import "./Pagination.css"

const Pagination = ({ gamesPerPage, totalGames, paginate }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <div>
            <div className = "botonespag">
                {pageNumbers.map(number => (
                    <div key={number}>
                        <button className="btnum" onClick = {() => paginate(number)}>{number}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pagination;