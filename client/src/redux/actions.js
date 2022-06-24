export const GET_DOGS = "GET_DOGS"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const ADD_DOG = "ADD_DOG"
export const ADD_FAVORITE = "ADD_FAVORITE"
export const REMOVE_FAVORITE = "REMOVE_FAVORITE"
const URL_DOGS = "http://localhost:3001/breeds"


export function getDogs(){
    return function(dispatch){
        return fetch(URL_DOGS)
        .then(respuesta => respuesta.json())
        .then(rjson => dispatch({
            type: GET_DOGS,
            payload: rjson
        }))
    }
}

// export function getTemperaments(){}

// export function addDog(){}

export function addFavorite(dog){
    return{
        type: ADD_FAVORITE,
        payload: dog
    }
}

export function removeFavorite(id){
    return{
        type: REMOVE_FAVORITE,
        payload: id
    }
}