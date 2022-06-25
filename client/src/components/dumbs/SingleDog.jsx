import React from "react";

export default function SingleDog(props){
    return(
        <div className="dogContainer">
            <div>
                <img src={props.image} alt="Img" />
            </div>
            <div>
                <h3>{props.name}</h3>
                <h5>{props.temperament.map(t => <h3 key={t+Math.random}>{t}</h3>)}</h5>
                <h5>{props.weight.map(w => <h3 key={w+Math.random}>{w}</h3>)}</h5>
            </div>
        </div>
    )
}
