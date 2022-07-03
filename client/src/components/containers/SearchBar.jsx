import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameOfDog } from "../../redux/actions";
import { Link } from 'react-router-dom'
import styles from "./modules/SearchBar.module.css"

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchDog, setSearchDog] = useState("");

    const handleInput = (e) => {
        e.preventDefault()
        setSearchDog(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(getNameOfDog(searchDog));
    }

    return(
        <div className={styles.Search_Bar}>
            <div>
                <Link to="/breeds/create" >
                    <button className={styles.create_but}>Create 🐶</button>
                </Link>
          </div>
          <div className={styles.Search_input}>
            <input type="text" onChange={handleInput} placeholder="Search..."/>
            <button type="submit" onClick={handleSubmit}>
                Search
            </button>
          </div>
        </div>
    )
}
