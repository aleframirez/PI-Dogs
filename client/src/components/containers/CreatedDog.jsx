import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addDog, getTemperaments } from '../../redux/actions'
import {Link, useHistory} from "react-router-dom";
import styles from "./modules/Created.module.css"


const validate = (form) => {
  console.log(form)
  let error = {}
  // let LifeSp = document.getElementById("form.life_span");
  // console.log(document)
  if(!form.name) error.name = "Required fields: Name"
  if(!form.min_height || !form.max_height) error.height = "Required fields: Height min - max"
  if(parseInt(form.min_height) >= parseInt(form.max_height)) error.height = "Seems to be something wrong with the height"
  if(!form.min_weight || !form.max_weight) error.weight = "Required fields: Weight min - max"
  if(parseInt(form.min_weight) >= parseInt(form.max_weight)) error.weight = "Seems to be something wrong with the weight"
  if(isNaN(form.life_span) || form.life_span==="" || form.life_span < 1 || form.life_span > 99) error.life_span = "Seems to be something wrong with the Lifespan"
  // console.log("Finisimo detalle de los errores", Object.values(error).length)
  return error
}

export default function CreatedDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  // const [button, setButton] = useState(true);
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

  // useEffect(() => {
  //   if(
  //     form.name.length > 0 &&
  //     form.min_height.length > 0 &&
  //     form.max_height.length > 0 &&
  //     form.min_weight.length >0 &&
  //     form.max_weight.length >0 &&
  //     form.min_height > form.max_height &&
  //     form.min_weight > form.max_weight
  //     ){
  //       setButton(false)
  //     }
  //     else{
  //       setButton(true)
  //     }
  // },[form, setButton])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(error.values) return alert("Please correct the creation fields")
    form.temperaments = form.temperaments.filter((item, index) => {
      return form.temperaments.indexOf(item) === index;
    })
    console.log('Del coso', form.temperaments)
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
    history.push('/breeds')
  }
  // console.log('asdasdasdasdada',form.temperaments)

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
        <Link to="/breeds">
          <button className={styles.button_home}>Go Home 🐶</button>
        </Link>
      <div className={styles.papa_grande}>
            <div className={styles.created_errors}>
              <div>{error && <h2>Do you have some erros?</h2>}</div>
              <span>{error.name && <h3>{error.name}</h3>}</span>
              <span>{error.height && <h3>{error.height}</h3>}</span>
              <span>{error.weight && <h3>{error.weight}</h3>}</span>
              <span>{error.life_span && <h3>{error.life_span}</h3>}</span>
            </div>
        <div className={styles.created_background}>
          <div className={styles.created_all}>
            <form className={styles.created_form} action="" id='form' onSubmit={handleSubmit}>
              <div>
                <div>
                  <p>Name</p>
                  <input type="text" value={form.name} name='name' onChange={handleChange} placeholder='Name...' />
                </div>
              </div>
              <div className={styles.created_TexInp}>
                  <p>Min Height: </p>
                  <input type="number" value={form.min_height} name='min_height' onChange={handleChange} min='1' max='100' placeholder='...' />
                  <p> - Max height: </p>
                  <input type="number" value={form.max_height} name='max_height' onChange={handleChange} min='1' max='100' placeholder='...' />
              </div>
              <div className={styles.created_TexInp}>
                  <p>Min weight: </p>
                  <input type="number" value={form.min_weight} name='min_weight' onChange={handleChange} min='1' max='100' placeholder='...' />
                  <p> - Max weight:</p>
                  <input type="number" value={form.max_weight} name='max_weight' onChange={handleChange} min='1' max='100' placeholder='...' />
              </div>
              <div className={styles.created_TexInp}>
                  <p>Lifespan...</p>
                  <input type="text" value={form.life_span} name='life_span' onChange={handleChange} min='1' max='100' placeholder='...' />
              </div>
              <div>
                <p>img</p>
                <input type="url" value={form.image} name='image' onChange={handleChange} placeholder='Url image...' />
                <br/>
              </div>
              <div>
                <h3>Select the temperaments</h3>
              </div>
              <div>
                <select onChange={handleSelect}>
                  <option disabled selected defaultValue>Temperaments</option>
                  {temperaments.map((z,m) => (
                    <option value={z.name} key={m}>{z.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <button disabled={Object.values(error).length} type="submit" form="form">Add puppy</button>
              </div>
            </form>
              <div>
                <div className={styles.created_temp}>
                  {form.temperaments.map((el,ds) => 
                    <div>
                      <button key={ds} onClick={() => handleDelete(el)} className={styles.temp_button}>{`${el}`}</button>
                    </div>
                  )}
                </div>
              </div>
          </div>
        </div>
        <div className={styles.created_home}>
        </div>
      </div>
    </div>
  )
}
