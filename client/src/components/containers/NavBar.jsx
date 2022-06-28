import React from 'react'
import { Link } from 'react-router-dom'
import FilterCard from './FilterCard'
import SearchBar from './SearchBar'

export default function NavBar() {
  return (
    <div className='nav_container'>
        <div>
            <h3>Let's search some puppys!</h3>
        </div>
        <div>
            <SearchBar />
        </div>
        <div>
          <Link to="/breeds/create" >Create your own puppy</Link>
        </div>
        <div>
          <FilterCard />
        </div>
    </div>
  )
}
