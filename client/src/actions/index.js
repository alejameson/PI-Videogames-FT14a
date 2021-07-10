const axios = require('axios').default;
export const GET_ALL_GAMES = "GET_ALL_GAMES"
export const SEARCH_GAMES = "SEARCH_GAMES"

export function getAllGames(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogames`)
        .then((response) => {
            dispatch({
                type: GET_ALL_GAMES,
                payload: response.data,
            })
        })       
    }
}

export function SearchGames(titulo){
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogames?search=${titulo}`)
        .then((response) => {
            dispatch({
                type: SEARCH_GAMES,
                payload: response.data,
            })
        })
    }
}