import { GET_DOGS, ADD_FAVORITE, REMOVE_FAVORITE } from "./actions"
// GET_TEMPERAMENTS, ADD_DOG

let initialState = {
    dogs: [],
    favorites: []
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload
            }
        case ADD_FAVORITE:
            return{
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case REMOVE_FAVORITE:
            return{
                ...state,
                favorites: state.favorites.filter((e) => {
                    return e.id !== action.payload;
                })
            }
        default:
            return {...state};
    }
}