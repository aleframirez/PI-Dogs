import React from 'react'
// import { Link } from 'react-router-dom'
import FilterCard from './FilterCard'
import SearchBar from './SearchBar'
import styles from "./modules/NavBar.module.css"

export default function NavBar() {
  return (
    <div className={styles.nav_container}>
          <SearchBar />
          {/* <div>
            <Link to="/breeds/create" >
              <button>Create</button>
            </Link>
          </div> */}
        <div>
          <FilterCard />
        </div>
    </div>
  )
}
