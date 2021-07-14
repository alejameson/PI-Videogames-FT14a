import React from "react";
import { Link } from "react-router-dom";
import joystick from "../../Joystick2.png";
import "./Landing.css";

export default function Landing(){
    return (
        <div>
            <div><h2 className = "TituloLand"> Presione el mando para comenzar</h2></div>
            <Link to = "/home"><div className = "Joystick"><img src={joystick} alt="" width="150" height="100"/></div></Link>
        </div>
    )
}