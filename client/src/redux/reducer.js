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
    GET_CREATED_DOGS,
    ADD_DOG
} from "./actions"

let initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    details: [],
    favorites: [],
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
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
            let myDetails = action.payload
            console.log('asdasdasdasd', myDetails)
            if(!myDetails[0].temperament[0]) {
                myDetails[0].temperament[0] = "no-temperaments"
            }
            return{
                ...state,
                details: myDetails
            };
        case ORDER_BY_WEIGHT:
            const orderWeight = action.payload === "min_weight" ? state.allDogs.sort((a, b) => {
                if(parseInt(a.weight[1]) > parseInt(b.weight[1])) return -1;
                if(parseInt(b.weight[1]) > parseInt(a.weight[1])) return 1;
                return 0;
            }) : state.allDogs.sort((a, b) => {
                if(parseInt(a.weight[1]) > parseInt(b.weight[1])) return 1;
                if(parseInt(b.weight[1]) > parseInt(a.weight[1])) return -1;
                return 0;
            });
            console.log('Este es un finisimo detalle del Reducer OrderByWeight:', orderWeight)
            return{
                ...state,
                dogs: orderWeight
            };
        case ORDER_BY_NAME:
            var porqueriaQueNoAnda
            switch(action.payload){
                case 'A-Z':
                    porqueriaQueNoAnda = function(a, b){
                        if(a.name < b.name){return -1}
                        if(a.name > b.name){return 1}
                        return 0;
                    }; break;
                case 'Z-A':
                    porqueriaQueNoAnda = function(a, b){
                        if(a.name < b.name){return 1}
                        if(a.name > b.name){return -1}
                        return 0;
                    }; break;
                case 'min_weight':
                    porqueriaQueNoAnda = function(a, b){
                        if(a.weight > b.weight){return 1}
                        if(a.weight < b.weight){return -1}
                        return 0
                    }; break;
                case 'max_weight':
                    porqueriaQueNoAnda = function(a, b){
                        if(a.weight < b.weight){return -1}
                        if(a.weight > b.weight){return 1}
                        return 0
                    }; break;
                default: break;
            }
            return{
                ...state,
                dogs: state.dogs.sort(porqueriaQueNoAnda)
            };
        case FILTER_BY_TEMPERAMENT:
            const allPuppys = state.allDogs;
            // console.log('Finisimo detalle del Reducer FilterDog:', allPuppys)
            let filteredDog = [];
            if(action.payload === "All"){
                filteredDog = allPuppys;
            }else{
                for (let i = 0; i < allPuppys.length; i++) {
                    let found = allPuppys[i].temperament.find((t) => t === action.payload);
                    if(found){
                        filteredDog.push(allPuppys[i]);
                    }
                }
            }
            return{
                ...state,
                dogs: filteredDog
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
        case GET_CREATED_DOGS:
            // const allDogs = state.allDogs;
            const createdDogs = action.payload === 'My_Dogs' ? state.allDogs.filter(e => e.createdInDb) : state.allDogs.filter(e => !e.createdInDb)
            return{
                ...state,
                dogs: action.payload === "All" ? state.allDogs : createdDogs
            };
        case ADD_DOG:
            return{
                ...state
            };
        default:
            return {...state};
    }
}
