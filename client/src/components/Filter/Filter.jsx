import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, FilterGames } from "../../actions";
import "./Filter.css";

export default function Filter(){
 const allgenres = useSelector((state) => state.genres);
 const dispatch = useDispatch();

 useEffect(() => {
     dispatch(getGenres())
 }, [dispatch]);

 function handleOnChange(e) {
    dispatch(FilterGames(e.target.name));
 }

    return (
        <div className="filtercont">
            <label htmlFor='filter' className="palabrita">FILTER BY</label>
                <select name='filter' onChange={handleOnChange} >
                    <option value="All">All Games</option>
                    {allgenres.map((genre) =>(
                        <option value={genre.name} >{genre.name}</option>
                    ))}
                </select>
        </div>
    )
}