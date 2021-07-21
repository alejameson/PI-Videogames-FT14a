import React, { useEffect, useState }from "react";
import { useSelector, useDispatch } from "react-redux";
import { GameById } from "../../actions";
import { Link } from "react-router-dom";
import "./Detail.css";

export default function Detail({id}){
  const [loading, setLoading] = useState(true);  
  const gameid = useSelector((state) => state.gameById);

  const dispatch = useDispatch();

  console.log(gameid);
  
  useEffect(() => {
      dispatch(GameById(id));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [gameid]);

    return (
       <div> 
        {!loading && Object.keys(gameid).length > 0? 
        <div className="detail">
            <div className="imgdetail">
                <img src={gameid.img} alt="" width="650" height="450"/>
                <div className="contdet">
                    <h1>{gameid.name.charAt(0).toUpperCase() + gameid.name.slice(1)}</h1>
                    <h4 className="colorlaunch">{gameid.launchdate}</h4>
                    <h4 className="colorat">⭐{gameid.rating}</h4>
                    <h4 className="colorplat">{gameid.plataforms}</h4>
                    <h4 className="colorgen">{gameid.genres.map(g => g.name).join()}</h4>
                </div>    
            </div>
            <div className="game">
                <div className="detaildesc">
                    <div className="descript"><h3>DESCRIPTION</h3></div>
                        <h4>{gameid.description}</h4>
                </div>
                    <div className="btndetail"><Link to="/home"><button className="btnhome">HOME</button></Link></div>
            </div>
        </div>
        : (
            (<div className="loadingdetail"><img src="https://cdn2.scratch.mit.edu/get_image/gallery/3887263_170x100.png" width="200" height="200"/></div>)
        )
        }
      </div>  
    )
}