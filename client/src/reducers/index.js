import { GET_ALL_GAMES, ORDER_GAMES, SEARCH_GAMES } from "../actions";

const initialState = {
    gamesLoaded: [],
    gameSearch: [],
    gameOrder: [],
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

        case ORDER_GAMES:
            const order = action.payload;
            order.sort(function(a,b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
            console.log(order);
            return {
                ...state,
                gamesLoaded: order,
            }  
            
        default:
            return state;
    }
}

export default rootReducer;