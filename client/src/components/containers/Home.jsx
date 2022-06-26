import React, {useEffect} from "react";
import PackOfDogs from "../dumbs/PackOfDogs";
import { connect } from "react-redux";
import { getDogs } from "../../redux/actions";
import NavBar from "./NavBar";

function mapStateToProps(state){
    return{
        dogs: state.dogs
    }
}

function Home(props){
    // console.log(props)
    useEffect(() => {
        props.getDogs();
    },[])
    
    return(
        <div className="container">
            <NavBar />
            <div>
                <select>
                    <option value = "temperaments">Temperaments</option>
                    <option value = "breeds">Breed</option>
                </select>
            </div>
            <div>
                <select>
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
