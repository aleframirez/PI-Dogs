import React from "react";
import SingleDog from "./SingleDog"
import styles from "./modules/PackOfDogs.module.css"
import { useState } from "react";
import Paginado from "../containers/Paginado";

export default function PackOfDogs({dogs}){
    // console.log('Este es el detalle de PackOfDogs:', dogs)
    const [pagina, setPagina] =  useState(1)
    const [porPagina, setPorPagina] = useState(8)

    const maximo = dogs.length / porPagina

    // console.log('Que lo que ta pasando aqui Pablo Lorenzo?', Math.ceil(maximo))
    return(
        <div>
            <div className={styles.packOfDog}>
                <Paginado pagina={pagina} setPagina={setPagina} maximo={maximo}/>
            </div>
            <div className={styles.packOfDog}>
                {console.log(dogs)}
                {dogs.length > 0 ? (
                    dogs.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
                    .map((e) => (
                        <div key={e.id} className="dogInPack">
                            <SingleDog
                                id = {e.id}
                                image = {e.image}
                                name = {e.name}
                                temperament = {e.temperament}
                                weight = {e.weight}
                                height = {e.height}
                                life_span = {e.life_span}
                                createdInDb = {e.createdInDb}
                                />
                        </div>
                    ))
                ) : (
                    <h2>There is no dogs here</h2>
                )}
            </div>
        </div>
    )
}
