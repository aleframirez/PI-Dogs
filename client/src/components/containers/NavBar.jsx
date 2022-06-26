import React from 'react'
import SearchBar from './SearchBar'

export default function NavBar() {
  return (
    <div className='nav_container'>
        <div>
            <span>Hola</span>
            <span>Hello</span>
        </div>
        <div>
            <SearchBar />
        </div>
    </div>
  )
}
