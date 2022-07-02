import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addDog, getTemperaments } from '../../redux/actions'
import {Link, useHistory} from "react-router-dom";
import styles from "./modules/Created.module.css"


const validate = (form) => {
  let error = {}
  if(!form.name) error.name = "Required fields: Name"
  if(!form.min_height || !form.max_height) error.height = "Required fields: Height min - max"
  if(!form.min_weight || !form.max_weight) error.weight = "Required fields: Weight min - max"
  if(!form.life_span) error.life_span = "Required fields: Lifespan'"
  return error
}

export default function CreatedDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [button, setButton] = useState(true);
  const [error, setErrors] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    image: "",
  });

  const history = useHistory();

  const [form, setForm] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span:  "",
    image: "",
    temperaments: [],
  })

  useEffect(() => {
    dispatch(getTemperaments());
  },[dispatch]);

  useEffect(() => {
    if(
      form.name.length > 0 &&
      form.min_height.length > 0 &&
      form.max_height.length > 0 &&
      form.min_weight.length >0 &&
      form.max_weight.length >0
      ){
        setButton(false)
      }else{
        setButton(true)
      }
  },[form, setButton])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(error.values) return alert("Please correct the creation fields")
    dispatch(addDog(form));
    alert("Your puppy was successufully added");
    setForm({
      name: "",
      min_height: "",
      max_height: "",
      min_weight: "",
      max_weight: "",
      life_span:  "",
      image: "",
      temperaments: [],
    })
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    });
    setErrors(validate({
      ...form,
      [e.target.name] : e.target.value
    }))
  }

  const handleSelect = (e) => {
    setForm({
      ...form,
      temperaments: [...form.temperaments, e.target.value]
    })
  }

  const handleDelete = (el) => {
    setForm({
      ...form,
      temperaments: form.temperaments.filter(temp => temp !== el)
    })
  }


  return (
    <div>
      <div className={styles.created_home}>
        <Link to="/breeds">
          <button className={styles.button_home}>Go Home</button>
        </Link>
      </div>
      <div className={styles.created_background}>
        <div className={styles.created_all}>
          <form className={styles.created_form} action="" id='form' onSubmit={handleSubmit}>
            <div>
              <div>
                <p>Name</p>
                <input type="text" value={form.name} name='name' onChange={handleChange} placeholder='Name...' />
              </div>
              <div>{error.name && <p>{error.name}</p>}</div>
            </div>
            <div>
              <div>
                <p>Min Height</p>
                <input type="text" value={form.min_height} name='min_height' onChange={handleChange} placeholder='Min height...' />
              </div>
              <div>
                <p>Max height</p>
                <input type="text" value={form.max_height} name='max_height' onChange={handleChange} placeholder='Max height...' />
              </div>
              <div>{error.height && <p>{error.height}</p>}</div>
            </div>
            <div>
              <div>
                <p>Min weight</p>
                <input type="text" value={form.min_weight} name='min_weight' onChange={handleChange} placeholder='Min weight...' />
              </div>
              <div>
                <p>Max weight</p>
                <input type="text" value={form.max_weight} name='max_weight' onChange={handleChange} placeholder='Max weight...' />
              </div>
              <div>{error.weight && <p>{error.weight}</p>}</div>
            </div>
            <div>
              <div>
                <p>Lifespan...</p>
                <input type="text" value={form.life_span} name='life_span' onChange={handleChange} placeholder='Lifespan...' />
              </div>
              <div>{error.life_span && <p>{error.life_span}</p>}</div>
            </div>
            <div>
              <p>img</p>
              <input type="text" value={form.image} name='image' onChange={handleChange} placeholder='image...' />
            </div>
            <div>
              <h3>Select the temperaments</h3>
            </div>
            <div>
              <select onChange={handleSelect}>
                <option disabled selected defaultValue>Temperaments</option>
                {temperaments.map(z => (
                  <option value={z.name} key={z.name+Math.random()}>{z.name}</option>
                ))}
              </select>
            </div>
            <div>
              <button disabled={button} type="submit" form="form">Add puppy</button>
            </div>
          </form>
            <div>
              <div>
                <h2>Temperaments</h2>
              </div>
              <div>
                {form.temperaments.map(el => 
                  <div key={el} onClick={() => handleDelete(el)}>
                    <p>{`${el}`}</p>
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
