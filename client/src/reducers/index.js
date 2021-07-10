import { GET_ALL_GAMES, SEARCH_GAMES } from "../actions";

const initialState = {
    gamesLoaded: [],
    gameSearch: [],
}

function rootReducer (state = initialState, action){
    switch(action.type){

        case GET_ALL_GAMES:
            return{
                ...state,
                gamesLoaded: action.payload,
            }

        case SEARCH_GAMES:
            return {
                ...state,
                gameSearch: action.payload,
            }    

        default:
            return state;
    }
}

export default rootReducer;