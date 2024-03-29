import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterByTemperament, getDogs, getTemperaments, OrderByName, getCreatedDogs, OrderByWeight } from '../../redux/actions';
import styles from "./modules/Filter.module.css"

export default function FilterCard({setPagina, setInput}) {
    const dispatch = useDispatch();
    // const { dogs } = useSelector((state) => state);
    // const allDogs = useSelector(state => state.dogs);
    const allTemp = useSelector(state => state.temperaments)
    const [orden, setOrden] = useState("");

    useEffect(() => {
        // if(!dogs.length)dispatch(getDogs());
        dispatch(getTemperaments());
    },[dispatch]);

    const handleFilterByTemp = (e) => {
        e.preventDefault();
        dispatch(FilterByTemperament(e.target.value));
        setPagina(1)
        setInput(1)
    }

    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(OrderByName(e.target.value));
        setOrden(`${e.target.value}`)
    }

    const handleOrderByWeight = (e) => {
        e.preventDefault();
        dispatch(OrderByWeight(e.target.value));
        setOrden(`${e.target.value}`)
    }

    const handleGetCreatedDog = (e) => {
        e.preventDefault();
        dispatch(getCreatedDogs(e.target.value));
        setOrden(`${e.target.value}`)
    }

  return (
    <div className={styles.filter_max}>
        <div>
            <select onChange={e => handleOrderByName(e)}>
                <option disabled selected defaultValue>Sort</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
                {/* <option value="5 - 10 kg">peso</option> */}
            </select>
        </div>
        <div>
            <select onChange={e => handleOrderByWeight(e)}>
                <option disabled selected defaultValue>Order by Weight</option>
                <option value='5 - 10 kg'>aaa</option>
            </select>
        </div>
        <div>
            <select onChange={e =>handleFilterByTemp(e)}>
                <option disabled selected defaultValue>Temperaments</option>
                <option value="All">All</option>
                {
                    allTemp?.map(o => (
                        <option value={o.name} key={o.name+Math.random}>{o.name}</option>
                    ))
                }
            </select>
        </div>
        <div>
            <select onChange={e => handleGetCreatedDog(e)}>
                <option disabled selected defaultValue>List of dogs</option>
                <option value="All">All the puppys</option>
                <option value="My_Dogs">My Dogs</option>
            </select>
        </div>
    </div>
  )
}
