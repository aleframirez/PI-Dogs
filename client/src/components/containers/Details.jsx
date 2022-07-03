import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom"
import { getDetails } from '../../redux/actions'
import styles from "./modules/Details.module.css"

export default function Details() {
  const dispatch = useDispatch()
  let { id } = useParams()

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const details = useSelector((state) => state.details)
  console.log('Estos son los finisimos detalles de Details:', details)

  let dogName, dogImg, dogTemp = [], dogHeight, dogWeight, dogLife_span;

  if(details[0]){
    dogName = details[0].name;
    dogImg = details[0].image;
    dogWeight = details[0].weight;
    dogHeight = details[0].heigh;
    dogLife_span = details[0].life_span;

    if(details[0].temperament[0]) dogTemp = [...details[0].temperament];
    if(details[0].temperament[0].name) dogTemp = details[0].temperament.map(q => q.name)

  }

  return (
    <article className={styles.filter_blur}>
      {/* <NavBar /> */}
      <Link to="/breeds">
        <button className={styles.button_home}>Go Home 🐶</button>
      </Link>
      <div className={styles.detail_card}>
        <div className={styles.detail_content}>
          <div>
            <img className={styles.detail_img} src={dogImg} alt="img" />
          </div>
          <div className={styles.detail_info}>
              <div>
                <h1>{dogName}</h1>
              </div>
              <div>
                <div className={styles.detail_breed}>
                  <h3>{`Height: ${dogHeight && dogHeight[0]}Cm - ${dogHeight && dogHeight[1]}`} Cm</h3>
                  <h3>{`Weight: ${dogWeight && dogWeight[0]}Kg - ${dogWeight && dogWeight[1]}`} Kg</h3>
                  <h3>{`Life span: ${dogLife_span} years`}</h3>
                </div>
                <div>
                  <div>
                    <div>
                      <h2>Temperaments:</h2>
                    </div>
                    <div className={styles.temp_details}>
                      {dogTemp.map(dt => <h5 key={dt}>{dt}</h5>)}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button className={styles.det_but}> <span>Add to Fav</span></button>
              </div>
          </div>
        </div>
      </div>
    </article>
  )
}
