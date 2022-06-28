import axios from "axios";
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
export const GET_CREATED_DOGS = "GET_CREATED_DOGS"
export const FILTER_SORT = "FILTER_SORT"


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
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/breeds/detail/'+id);
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
        // console.log('getDetails:', id)
        // const respuesta = await fetch('http://localhost:3001/breeds/'+id)
        // const rjson = await respuesta.json()
        // return dispatch({
        //     type: GET_DETAILS,
        //     payload: rjson
        // })
    }
}
// Funcion para postear un nuevo perro.
export function addDog(payload){
    return async function(dispatch){
        const respuesta = await axios.post("http://localhost:3001/breeds/create", payload);
        // const rjson = await respuesta.json();
        return dispatch({
            type: ADD_DOG,
            payload: respuesta.data
        });
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
export function OrderByWeight(payload){
    return{
        type: ORDER_BY_WEIGHT,
        payload
    }
}
// Funcion para ordenarlos por nombre.
export function OrderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}
// Funcion para filtrarlos por temperamento.
export function FilterByTemperament(payload){
    return{
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}
// Funcion para obtener los perros creados.
export function getCreatedDogs(payload){
    return{
        type: GET_CREATED_DOGS,
        payload
    }
}

export function sortName(order){
    return{
        type: FILTER_SORT,
        payload: order
    }
}