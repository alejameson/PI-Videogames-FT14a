import React from "react";
import { useSelector } from "react-redux";
import Games from "../Games/Games";
import "./BuscadorResult.css";

export default function BuscadorResult(){

const search = useSelector((state) => state.gameSearch);
console.log(search);


return (
    <div>
        <Games games={search} loading={false}/>
    </div>
)

}