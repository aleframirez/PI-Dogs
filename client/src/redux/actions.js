export const GET_DOGS = "GET_DOGS"
export const GET_NAME_DOGS = "GET_NAME_DOGS"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const GET_DETAILS = "GET_DETAILS"
export const ADD_DOG = "ADD_DOG"
export const ADD_FAVORITE = "ADD_FAVORITE"
export const REMOVE_FAVORITE = "REMOVE_FAVORITE"
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT,"


// Funcion para obtener todos los perros.
export function getDogs(){
    return function(dispatch){
        return fetch("http://localhost:3001/breeds")
        .then(respuesta => respuesta.json())
        .then(rjson => dispatch({
            type: GET_DOGS,
            payload: rjson
        }))
    }
}

//Funcion para obtener los perros por nombre.
export function getNameOfDog(name){
    return function(dispatch){
        return fetch("http://localhost:3001/breeds/search?name=" + name)
        .then(respuesta => respuesta.json())
        .then(rjson => dispatch({
            type: GET_NAME_DOGS,
            payload: rjson
        }))
    }
}

// Funcion para obtener temperamentos.
export function getTemperaments(){
    return function(dispatch){
        return fetch("http://localhost:3001/temperaments")
        .then(respuesta => respuesta.json())
        .then(rjson => dispatch({
            type: GET_TEMPERAMENTS,
            payload: rjson
        }))
    }
}

// Funcion para obtener los detalles.
export function getDetails(id){
    return function(dispatch){
        return fetch("http://localhost:3001/breeds/" + id)
        .then(respuesta => respuesta.json())
        .then(rjson =>dispatch({
            type: GET_DETAILS,
            payload: rjson
        }))
    }
}

// Funcion para postear un nuevo perro.
export function addDog(payload){
    return function(dispatch){
        return fetch("http://localhost:3001/breeds/create", payload)
        .then(respuesta => respuesta.json())
        .then(rjson => dispatch({
            type: ADD_DOG,
            payload: rjson
        }))
    }
}

// Funcion para agregar a favoritos.
export function addFavorite(dog){
    return{
        type: ADD_FAVORITE,
        payload: dog
    }
}

// Funcion para remover de favoritos.
export function removeFavorite(id){
    return{
        type: REMOVE_FAVORITE,
        payload: id
    }
}

// Funcion para ordenarlos por peso.
export function orderByWeight(payload){
    return{
        type: ORDER_BY_WEIGHT,
        payload
    }
}

// Funcion para ordenarlos por nombre.
export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

// Funcion para filtrarlos por temperamento
export function filterByTemperament(payload){
    return{
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}