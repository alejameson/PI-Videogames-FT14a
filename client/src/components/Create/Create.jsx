import React ,{useEffect, useState} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllGames, getGenres } from "../../actions";
import "./Create.css";

export default function Create () {
    const [state, setState] = useState({
        name: "",
        description: "",
        launchdate: "",
        rating: "",
        plataforms: "",
        img: "",
        genres: [],    
    });

    const allgenres = useSelector((state) => state.genres);

    const dispatch = useDispatch();
    const { push } = useHistory();

    let id = 1;

    const genresid = [];

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]); 

    function handleChange(e) {
        if(e.target.name === "genres"){
            const arr = state[e.target.name];
            setState(state => ({
                ...state,
                [e.target.name] : arr.concat(e.target.value),
            }))
        }else{    
            setState(state => ({
                ...state,
                [e.target.name] : e.target.value
            }))
        }
    }
    
    const url = "/home";

    function handleSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:3001/videogame", state)
        .then(response => {
            dispatch(getAllGames())
            push(url);
        })
        e.target.reset();
        alert('Videogame created successfully!');

        setState({
            name: "",
            description: "",
            launchdate: "",
            rating: "",
            plataforms: "",
            img: "",
            genres: [],
        }); 
    }
    return (
        <div className="Creacion">
            
            <div className="cuadro">
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <div className="name"> 
                            <label>Game Name</label>
                            <input 
                                className="inputname"
                                type="text" 
                                placeholder="Game Name..." 
                                name="name"
                                value={state.name} 
                                onChange={handleChange}
                            />
                        </div> 
                        <div className="description">     
                            <label>Description</label>
                            <input 
                                className="inputdesc"
                                type="text" 
                                placeholder="Description..." 
                                name="description"
                                value={state.description} 
                                onChange={handleChange}
                            />
                        </div> 
                        <div className="launchdate"> 
                            <label>Launch Date</label>
                            <input 
                                className="inputlaunch"
                                type="text" 
                                placeholder="Launchdate..." 
                                name="launchdate"
                                value={state.launchdate} 
                                onChange={handleChange}
                            />
                        </div>    
                        <div className="rating"> 
                            <label>Rating (0-5)</label>
                            <input 
                                className="inputrating"
                                type="number"
                                name="rating"
                                value={state.rating}
                                onChange={handleChange}
                                min="0"
                                max="5"
                            />
                        </div> 
                        <div className="platforms">    
                            <label>Platforms</label>
                            <select name="plataforms" onChange={handleChange}>
                                <option value="pc">PC</option>
                                <option value="xbox">XBOX</option>
                                <option value="ps5">ps5</option>
                            </select>
                        </div>  
                        <div className="img">  
                            <label>Image url</label>
                            <input 
                                className="inputimg"
                                type="text" 
                                placeholder="Img url..." 
                                name="img"
                                value={state.img} 
                                onChange={handleChange}
                            />
                       </div>  
                        <h3>Genres</h3>
                        <ul className="genres">
                            {allgenres.map((gen) => (
                                <div className="inputgen">
                                    <input
                                        type="checkbox"
                                        name="genres"
                                        value={id++}
                                        onChange={handleChange}
                                    />
                                    <label name={gen}>{gen.name}</label>
                                </div>
                            ))}
                        </ul>
                        <button className="enviar" type="submit">ENVIAR</button>
                    </div>
                    <div className="pendex">
                        <div className="createtitle"><h2>VIDEO-GAME CARD CREATE 🎮</h2></div><div className="titulo"><img src="https://www.pngplay.com/wp-content/uploads/8/Video-Game-Transparent-File.png" alt="" /></div> 
                    </div>       
                </form>
            </div>    
        </div>
    )
} 