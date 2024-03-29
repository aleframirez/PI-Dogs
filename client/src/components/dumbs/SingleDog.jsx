import React from "react";
import { Link } from 'react-router-dom';
import styles from "./modules/SingleDog.module.css"

export default function SingleDog(props){
    // console.log('Estos son los props de SingleDog', props)
    return(
        <article className={styles.single_card}>
            <Link to={`/breeds/detail/${props.id}`}>
                <img className={styles.card_img} src={props.image} alt="Img" />
            </Link>
            <div className={styles.card_content}>
                <h4 className={styles.card_title}>{props.name.charAt(0).toUpperCase()+props.name.slice(1)}</h4>
                <span className={styles.card_subtitle}>
                    Weight: {props.weight.length?props.weight.join('Kg - ') : 
                    props.weight.map(w => 
                        <span key={w+Math.random}>{w+' Kg'}</span>
                    )}Kg
                </span>
                <span className={styles.card_description}>
                    {props.temperament.length?props.temperament.join(', ') : 
                    props.temperament.map(t =>
                         <span key={t+Math.random}>{t+' '}</span>
                     )}
                </span>
            </div>
        </article>
    )
}
