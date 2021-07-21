import React from 'react';
import { Link } from 'react-router-dom';
import Buscador from '../Buscador/Buscador';
import Ubisoft from "../../Ubisoftlogo.png";
import "./NavBar.css";

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
               <Link exact to ="/"> <img src="https://www.blastoff2fun.com/wp-content/uploads/2015/03/arcade.png" width="190" height="120" className="d-inline-block align-top" alt="" /> </Link>
            </div>
            <nav>
                <div className="list">
                    <div className="list-item">
                        <Link exact to="/home" >🏚️ Home</Link>
                    </div>
                </div>
            </nav>
            <nav>
                <div className="list-create">
                    <div className="list-item-create">
                        <Link exact to="/create" >✚ Create</Link>
                    </div>
                </div>
            </nav>
            <Buscador/>
        </header>
    )
}

