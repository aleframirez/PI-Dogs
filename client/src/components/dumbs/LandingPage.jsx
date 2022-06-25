import React from "react";
import {Link} from "react-router-dom";
import styles from './modules/LandingPage.module.css';
// import Home from "../../containers/Home";

export default function LandingPage(){
    return(
        <div className={styles.Main_Conteiner}>
            <div className={styles.Container}>
                <h1>Welcome</h1>
                <h4>To Doge</h4>
            </div>
            <div className={styles.Text}>
                <p>Algo de info mas por las dudas para no quedar cortina</p>
            </div>
                <Link to="/breeds">
                    <button className={styles.Landing_Home}>Home</button>
                </Link>
        </div>
    )
}
