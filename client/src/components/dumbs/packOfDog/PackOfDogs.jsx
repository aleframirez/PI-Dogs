import React from "react";
import SingleDog from "../singleDog/SingleDog"

export default function PackOfDogs({dogs}){
    return(
        <div className="packOfDog">
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