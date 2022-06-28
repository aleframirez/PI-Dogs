import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { getDetails } from '../../redux/actions'

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
    <div>
      <div>
        <div>
          <div>
            <img src={dogImg} alt="img" />
          </div>
          <div>
            <h1>{dogName}</h1>
            <h3>{`Height: ${dogHeight && dogHeight[0]} - ${dogHeight && dogHeight[1]}`} Cmts</h3>
            <h3>{`Weight: ${dogWeight && dogWeight[0]} - ${dogWeight && dogWeight[1]}`} Kg</h3>
            <h3>{`Life span: ${dogLife_span}`}</h3>
            <div>
              <h3>Temperaments: </h3>
              <ul>
                {dogTemp.map(dt => <li key={dt}>{dt}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
