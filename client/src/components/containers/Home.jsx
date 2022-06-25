import React, {useEffect} from "react";
import PackOfDogs from "../dumbs/PackOfDogs";
import { connect } from "react-redux";
import { getDogs, filterByTemperament } from "../../redux/actions";
import SearchBar from "./SearchBar";

function mapStateToProps(state){
    return{
        dogs: state.dogs
    }
}

function handleFilterByTemperament(e){
    dispatch(filterByTemperament(e.target.value))
}

function Home(props){
    // console.log(props)
    useEffect(() => {
        props.getDogs();
    },[props])
    
    return(
        <div className="container">
            <div>
                <select>
                    <option value = "temperaments">Temperaments</option>
                    <option value = "breeds">Breed</option>
                </select>
                <SearchBar />
            </div>
            <div>
                <select onChange={e => handleFilterByTemperament(e)}>
                    <option value = "All">All</option>
                    <option value = "Created">Createds</option>
                    <option value = "Api">Existents</option>
                </select>
            </div>
            <div>
                <PackOfDogs dogs={props.dogs}/>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, { getDogs })(Home);
