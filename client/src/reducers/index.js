import { GET_ALL_GAMES, ORDER_GAMES, SEARCH_GAMES, GET_GENRES, FILTER_GAMES, CREATOR_GAMES, BY_ID } from "../actions";

const initialState = {
    gamesLoaded: [],
    gameSearch: [],
    gamesMess: [],
    gameOrder: [],
    genres: [],
    gamesMess2: [],
    gamesFilter: [],
    gamesCreator: [],
    gameById: [],
}

function rootReducer (state = initialState, action){
    switch(action.type){

        case GET_ALL_GAMES:
            const origin = [];
            action.payload.map((e) => origin.push(e));
            const origin2 = [];
            action.payload.map((e) => origin2.push(e));
            return{
                ...state,
                gamesLoaded: action.payload,
                gamesMess: origin,
                gamesMess2: origin2,
                gamesFilter: origin2,
            }

        case SEARCH_GAMES:
            return {
                ...state,
                gameSearch: action.payload,
            }    

        case ORDER_GAMES:
        let optioncreat = [];
        if(state.gamesCreator.length < 1){
            optioncreat = state.gamesMess;
        }else{
            optioncreat = state.gamesCreator;
        }
        if(action.orden === "AZ"){   
            const order = state.gamesFilter.sort(function(a,b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
                });
                return {
                    ...state,
                    gameOrder: order,
                }  
        }else if(action.orden === "ZA"){
            const order = state.gamesFilter.sort(function(a,b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
                });
                return {
                    ...state,
                    gameOrder: order.reverse(),
                }  
        }else if(action.orden === "MAYOR"){
            const order = state.gamesFilter.sort(function(a,b) {
                var x = a.rating;
                var y = b.rating;
                return x < y ? -1 : x > y ? 1 : 0;
                });
                return {
                    ...state,
                    gameOrder: order.reverse(),
                }  
        }else if(action.orden === "MENOR"){
            const order = state.gamesFilter.sort(function(a,b) {
                var x = a.rating;
                var y = b.rating;
                return x < y ? -1 : x > y ? 1 : 0;
                });
                return {
                    ...state,
                    gameOrder: order,
                }  
        }
          
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            }  
        
        case FILTER_GAMES: 
          let optionfil = [];
          if(state.gamesCreator.length < 1){
              optionfil = state.gamesMess;
          }else{
              optionfil = state.gamesCreator;
          }
            if(action.filter === "All"){
                return {
                    ...state,
                    gamesFilter: optionfil,
                }
            }else {
                const filname = action.filter;
                console.log(filname);
                const filtrado = [];
                optionfil.map((game) => {
                    game.genres.map(g => {
                        if(g.name === filname){
                            filtrado.push(game);
                        }
                    })
                });
                /* console.log(filtrado); */
                return {
                    ...state,
                    gamesFilter: filtrado,
                }
            }    
            
        case CREATOR_GAMES:
            if(action.creator === "All"){
                console.log(state.gamesLoaded)
                return {
                    ...state,
                    gamesCreator: state.gamesMess,
                }
            }else if(action.creator === "mygames"){
                const mygames = state.gamesMess.filter((game) => game.id.length > 1)
                return {
                    ...state,
                    gamesCreator: mygames,
                }
            }else if(action.creator === "apigames"){
                const apigames = state.gamesMess.filter((game) => typeof game.id === "number")
                return {
                    ...state,
                    gamesCreator: apigames,
                }
            }

        case BY_ID:
            return {
                ...state,
                gameById: action.payload,
            }    

        default:
            return state;
    }
}

export default rootReducer;