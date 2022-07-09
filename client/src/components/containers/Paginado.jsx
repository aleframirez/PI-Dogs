import React from 'react'
import { useState } from 'react'
import FilterCard from './FilterCard'
import styles from './modules/Paginado.module.css'

export default function Paginado({pagina, setPagina, maximo, setInput, input}) {
  // const [input, setInput] = useState(1)

  const nextPage = () => {
    setInput(input + 1);
    setPagina(pagina + 1);
  }

  const prevPage = () => {
    setInput(input - 1);
    setPagina(pagina - 1);
  }
  
  const onKeyDown = (e) => {
    if(e.keyCode === 13){
      setPagina(parseInt(e.target.value))
      if(parseInt(e.target.value < 1) || 
      parseInt(e.target.value) > Math.ceil(maximo) ||
      isNaN(parseInt(e.target.value))){
        setPagina(pagina)
        setInput(pagina)
      }else{
        setPagina(parseInt(e.target.value))
      }
    }
  }

  const onChange = (e) => {
    setInput(e.target.value)
  }

  // console.log('Paginado', maximo)
  return (
    <div className={styles.paginado_container}>
      <div>
        <button className={styles.pag_button} onClick={pagina < 2 ? pagina : prevPage}>
          Prev
        </button>
      </div>
        <div>
          <input 
            onChange={e => onChange(e)} 
            onKeyDown={(e) =>onKeyDown(e)} 
            className={styles.input_paginado} 
            name="page" 
            autoComplete='off' 
            value={input}
          />
        </div>
        <div>
          <p>de {Math.ceil(maximo)}</p>
        </div>
      <div>
        <button className={styles.pag_button} onClick={pagina > maximo ? pagina : nextPage}>
          Next
        </button>
      </div>
    </div>
  )
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///                           Faltan estilos al input y botones                                                  ///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
