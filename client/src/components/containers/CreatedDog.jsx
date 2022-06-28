import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getTemperaments } from '../../redux/actions'
import {Link} from "react-router-dom";


const validate = (form) => {
  let error = {}
  if(!form.name) error.name = "Name is required"
  if(!form.min_heigh || !form.max_heigh) error.heigh = "Height is required"
  if(!form.min_weight || !form.max_weight) error.weight = "Weight is required"
  if(!form.life_span) error.life_span = "Lifespan is required: '(Years - Years)'"
  return error
}

export default function CreatedDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperament);

  const [button, setButton] = useState(true);
  const [error, setErrors] = useState({
    name: "",
    min_heigh: "",
    max_heigh: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    image: "",
  });

  const [form, setForm] = useState({
    name: "",
    min_heigh: "",
    max_heigh: "",
    min_weight: "",
    max_weight: "",
    life_span:  "",
    image: "",
    temperaments: [],
  })

  useEffect(() => {
    dispatch(getTemperaments());
  },[])
  return (
    <div>
      <Link to="/breeds"><button>Volver</button></Link>
      <h1>Crear</h1>
      <form>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" value="aaa" name="name" />
        </div>
        <div>
          <label>Otro</label>
          <input type="text" value="asdasd" name="otro" />
        </div>
        <div>
          <label>Otro1</label>
          <input type="text" value="asdasda" name="otro1" />
        </div>
        <div>
          <label>Otro2</label>
          <input type="checkbox" value="asdasdas" name="otro2" />
        </div>
      </form>
    </div>
  )
}
