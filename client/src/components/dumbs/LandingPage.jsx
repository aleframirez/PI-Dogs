import React from "react";
import {Link} from "react-router-dom";
import styles from './modules/LandingPage.module.css';
// import Home from "../../containers/Home";

export default function LandingPage(){
    return(
        <div className={styles.Main_Conteiner}>
            <div className={styles.Container}>
                <div>
                    <h1>Welcome</h1>
                    <h4>To Paradise</h4>
                </div>
                <div className={styles.Text}>
                    <h3>Here you can find some of the dog breeds best known to all of us. You can even create your own race!</h3>
                </div>
                    <Link to="/breeds">
                        <button className={styles.button}>Home</button>
                    </Link>
            </div>
        </div>
    )
}
