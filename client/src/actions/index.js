const axios = require('axios').default;
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const SEARCH_GAMES = "SEARCH_GAMES";
export const ORDER_GAMES = "ORDER_GAMES";
export const GET_GENRES = "GET_GENRES";
export const FILTER_GAMES = "FILTER_GAMES";
export const CREATOR_GAMES = "CREATOR_GAMES";
export const BY_ID = "BY_ID";

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

export function OrderGames(orden){
    return function (dispatch) {
        dispatch({
          type: ORDER_GAMES,
          orden: orden,
        });
      }
    }

export function getGenres(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/genres/db`)
        .then((response) => {
            dispatch({
                type: GET_GENRES,
                payload: response.data,
            })
        })       
    }
}

export function FilterGames(filter){
    return function (dispatch) {
        dispatch({
          type: FILTER_GAMES,
          filter: filter,
        });
      }
}

export function CreatorGames(creator){
    return function (dispatch) {
        dispatch({
          type: CREATOR_GAMES,
          creator: creator,
        });
      }
}

export function GameById(id){
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogame/${id}`)
        .then((response) => {
            dispatch({
                type: BY_ID,
                payload: response.data,
            })
        })
    }
}