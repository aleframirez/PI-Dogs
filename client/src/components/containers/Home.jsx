import React, { useEffect } from "react";
import PackOfDogs from "../dumbs/PackOfDogs";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions";
import NavBar from "./NavBar";
import styles from "../dumbs/modules/PackOfDogs.module.css";
import s from "./modules/Home.module.css"
// import CreatedDog from "./CreatedDog";

export default function Home() {
  const { dogs } = useSelector((state) => state);
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa", dogs)
  const dispatch = useDispatch();
  // console.log(props)
  useEffect(() => {
    if(!dogs.length) dispatch(getDogs());
  }, [dispatch]);

  return !dogs.length ? (
    <div className={s.wrapper}>
      <div className={s.circle}></div>
      <div className={s.circle}></div>
      <div className={s.circle}></div>
      <div className={s.shadow}></div>
      <div className={s.shadow}></div>
      <div className={s.shadow}></div>
    </div>
  ) : (
    <div className={styles.filter_blur}>
      <NavBar />
      <div>
        <PackOfDogs dogs={dogs} />
      </div>
    </div>
  );
}
