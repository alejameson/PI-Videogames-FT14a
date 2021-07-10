import React from "react";
import { Link } from "react-router-dom";
import joystick from "../Joystick.png"
import "./Landing.css";

export default function Landing(){
    return (
        <div>
            <div><h2 className = "TituloLand"> Presione el mando para comenzar</h2></div>
            <Link to = "/home"><div className = "Joystick"><img src={joystick} alt="" width="500" height="450" /></div></Link>
        </div>
    )
}