import React from "react";
import { Link } from "react-router-dom";
import Ubisoft from "../../Ubisoftlogo.png";
import "./Landing.css";

export default function Landing(){
    return (
        <div className="landingpage">
            <div className="appinfo">
                    <div className="titlearcade">
                        <img src="https://www.blastoff2fun.com/wp-content/uploads/2015/03/arcade.png" alt="" width="450" height="240"/>
                    </div>
                    <h1 className="spanland">"Welcome to Arcade app, this App was created with the objective of providing the user with information about video games of different platforms and give him the opportunity to create his own video game card."</h1>
                    <Link to="/home"><button className="startbtn">START NOW</button></Link>
            </div>
            <ul className="landplat">
                <div className="xbox"><img src="https://logos-marcas.com/wp-content/uploads/2020/11/Xbox-Logo.png" alt="" width="130" height="60"/></div>
                <div className="playstation"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/PlayStation_logo_and_wordmark.svg/2560px-PlayStation_logo_and_wordmark.svg.png" alt="" width="270" height="50"/></div>
                <div className="pcgamer"><img src="https://image.spreadshirtmedia.com/image-server/v1/mp/designs/1021672376,width=178,height=178,version=1552919503/pc-gamer-gaming-logo.png" alt="" width="90" height="65"/></div>
            </ul>
        </div>
    )
}