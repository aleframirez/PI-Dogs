import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterByTemperament, getDogs, getTemperaments, OrderByName, OrderByWeight, getCreatedDogs } from '../../redux/actions';

export default function FilterCard() {
    const dispatch = useDispatch();
    // const allDogs = useSelector(state => state.dogs);
    const allTemp = useSelector(state => state.temperaments)
    // const [orden, setOrden] = useState("");

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    },[dispatch]);

    const handleFilterByTemp = (e) => {
        e.preventDefault();
        dispatch(FilterByTemperament(e.target.value));
    }

    // const handleOrderByName = (e) => {
    //     e.preventDefault();
    //     dispatch(OrderByName(e.target.value));
    //     setOrden(`${e.target.value}`)
    // }

    // const handleOrderByWeight = (e) => {
    //     e.preventDefault();
    //     dispatch(OrderByWeight(e.target.value));
    //     setOrden(`${e.target.value}`)
    // }

    // const handleGetCreatedDog = (e) => {
    //     e.preventDefault();
    //     dispatch(getCreatedDogs(e.target.value));
    //     setOrden(`${e.target.value}`)
    // }

  return (
    <div>
        {/* <div>
            <select onChange={e => handleOrderByName(e)}>
                <option disable selected defaultValue>Alph order</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
        </div>
        <div>
            <select onChange={e => handleOrderByWeight(e)}>
                <option disable selected defaultValue>Order by Weight</option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
            </select>
        </div> */}
        <div>
            <select onChange={e =>handleFilterByTemp(e)}>
                <option disable selected defaultValue>Temperaments</option>
                <option value="All">All</option>
                {
                    allTemp?.map(o => (
                        <option value={o.name} key={o.name+Math.random}>{o.name}</option>
                    ))
                }
            </select>
        {/* <div>
            <select onChange={e => handleGetCreatedDog(e)}>
                <option disable selected defaultValue>Puppys</option>
                <option value="All">All the puppys</option>
                <option value="My_Dogs">My Dogs</option>
            </select>
        </div> */}
        </div>
    </div>
  )
}