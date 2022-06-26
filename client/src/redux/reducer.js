import { 
    GET_TEMPERAMENTS,
    REMOVE_FAVORITE,
    ORDER_BY_WEIGHT,
    GET_DOGS, 
    GET_NAME_DOGS,
    ADD_FAVORITE,
    ORDER_BY_NAME,
    FILTER_BY_TEMPERAMENT,
    GET_DETAILS,
} from "./actions"

let initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    favorites: [],
    details: [],
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload
            };
        case GET_NAME_DOGS:
            return{
                ...state,
                dogs: action.payload
            };
        case GET_TEMPERAMENTS:
            const filteredTemp = action.payload.filter(t => t.name !== "")
            return{
                ...state,
                temperaments: filteredTemp
            };
        case GET_DETAILS:
            const moreDetails = action.payload
            if(!moreDetails[0].temperaments[0]) moreDetails[0].temperaments[0] = "There are no temperaments"
            return{
                ...state,
                details: moreDetails
            };
        case ORDER_BY_WEIGHT:
            const orderWeight = action.payload === "min_weight" ? state.dogs.sort((a, b) => {
                if(parseInt(a.weight[1]) > parseInt(b.weight[1])) return 1;
                if(parseInt(b.weight[1]) > parseInt(a.weight[1])) return -1;
                return 0;
            }) : state.dogs.sort((a, b) => {
                if(parseInt(a.weight[1]) > parseInt(b.weight[1])) return -1;
                if(parseInt(b.weight[1]) > parseInt(a.weight[1])) return 1;
                return 0;
            });
            return{
                ...state,
                allDogs: orderWeight
            };
        case ORDER_BY_NAME:
            const orderName = action.payload === "A-Z" ? state.dogs.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            }) : state.dogs.sort((a, b) => {
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0;
            });
            return{
                ...state,
                allDogs: orderName
            };
        case FILTER_BY_TEMPERAMENT:
            const allTemperaments = state.dogs
            const getByTemp = action.payload === 'All' ? allTemperaments : allTemperaments.filter(e => e.allDogs === action.payload)
            return{
                ...state,
                allDogs: getByTemp
            };
        case ADD_FAVORITE:
            return{
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        case REMOVE_FAVORITE:
            return{
                ...state,
                favorites: state.favorites.filter((e) => {
                    return e.id !== action.payload;
                })
            };
        default:
            return {...state};
    }
}
