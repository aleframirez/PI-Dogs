import React from "react";
import SingleDog from "./SingleDog"
import styles from "./modules/PackOfDogs.module.css"

export default function PackOfDogs({dogs}){
    console.log('Que lo que ta pasando aqui Pablo Lorenzo?', dogs)
    return(
        <div className={styles.packOfDog}>
            {dogs.length > 0 ? (
                dogs.map((e) => (
                    <div key={e.id} className="dogInPack">
                        <SingleDog
                            image = {e.image}
                            name = {e.name}
                            temperament = {e.temperament}
                            weight = {e.weight}
                            />
                    </div>
                ))
            ) : (
                <h2>There is no dogs here</h2>
            )}
        </div>
    )
}
