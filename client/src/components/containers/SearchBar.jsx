import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameOfDog } from "../../redux/actions";

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
        <div>
            <input type="text" onChange={handleInput} placeholder="Search..."/>
            <button type="submit" onClick={handleSubmit}>
                Search
            </button>
        </div>
    )
}
