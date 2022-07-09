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
            // console.log('asdasdasdasd', myDetails)
            if(!myDetails[0].temperament[0]) {
                myDetails[0].temperament[0] = "no-temperaments"
            }
            return{
                ...state,
                details: myDetails
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
                        if(isNaN(a.weight[0])) a.weight[0] = a.weight[1]
                        if(isNaN(b.weight[0])) b.weight[0] = b.weight[1]
                        if(a.weight[0] > b.weight[0]){return 1}
                        if(a.weight[0] < b.weight[0]){return -1}
                        return 0
                    }; break;
                case 'max_weight':
                    porqueriaQueNoAnda = function(a, b){
                        if(isNaN(a.weight[0])) a.weight[0] = a.weight[1]
                        if(isNaN(b.weight[0])) b.weight[0] = b.weight[1]
                        if(a.weight[0] > b.weight[0]){return -1}
                        if(a.weight[0] < b.weight[0]){return 1}
                        return 0
                    }; break;
            default: break;
        }
            console.log(state.dogs.sort(porqueriaQueNoAnda))
            return{
                ...state,
                dogs: state.dogs.sort(porqueriaQueNoAnda)
            };
            case ORDER_BY_WEIGHT:
                const allDogues = state.allDogs
                const entreTantoYTanto = []
                for (let i = 0; i < allDogues.length; i++) {
                    console.log(allDogues[i].weight)
                    if(allDogues[i].weight[0] > 5 && allDogues[i].weight[1] < 11) entreTantoYTanto.push(allDogues[i])
                }
                return{
                    ...state,
                    dogs: entreTantoYTanto
                };
            case FILTER_BY_TEMPERAMENT:
                const allPuppys = state.allDogs; // constante con el estado global de todos los perros.
                let filteredDog = []; // array donde se guardaran los temperamentos.
                if(action.payload === "All"){
                filteredDog = allPuppys; // Si es all tre muestra todos.
            }else{
                for (let i = 0; i < allPuppys.length; i++) { // Recorre todo los perros.
                    let found = allPuppys[i].temperament.find((t) => t === action.payload);// Si encuentra uno con el temp buscado
                    if(found){
                        filteredDog.push(allPuppys[i]); // Pushea al array creado.
                    }
                }
            }
            return{
                ...state,
                dogs: filteredDog // Muestra el array creado con un temp unico o todos los perros.
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
            const createdDogs = action.payload === 'My_Dogs' ? state.allDogs.filter(e => e.createdInDb === true) : state.allDogs.filter(e => !e.createdInDb === false)
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
