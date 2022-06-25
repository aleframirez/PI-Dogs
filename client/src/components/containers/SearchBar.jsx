import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getNameOfDog } from '../../redux/actions';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [dog, setDog] = useState("");

    function handleInputChange(e){
        e.preventDefault()
        setDog(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameOfDog(dog))
    }
  return (
    <div>
            <input type="text"
            placeholder='Search for puppys...'
            onChange={(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
  )
}
