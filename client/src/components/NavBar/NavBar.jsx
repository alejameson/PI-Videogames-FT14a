import React from 'react';
import { NavLink } from 'react-router-dom';
import Buscador from '../Buscador/Buscador';
import Joystick2 from "../../Joystick2.png";
import "./NavBar.css";

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
               <NavLink exact to ="/"> <img id="logoHenry" src={Joystick2} width="80" height="50" className="d-inline-block align-top" alt="" /> </NavLink>
            </div>
            <Buscador/>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/home" >Home</NavLink>
                        <NavLink to="/favs" >Favoritas</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}