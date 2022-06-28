import React, {useEffect} from "react";
import PackOfDogs from "../dumbs/PackOfDogs";
import { connect } from "react-redux";
import { getDogs, filterByTemperament } from "../../redux/actions";
import NavBar from "./NavBar";
import CreatedDog from "./CreatedDog";

function mapStateToProps(state){
    return{
        dogs: state.dogs
    }
}

function Home(props){
    // console.log(props)
    useEffect((e) => {
        props.getDogs();
    },[])
    
    return(
        <div className="container">
            <NavBar />
            <div>
                <PackOfDogs dogs={props.dogs}/>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, { getDogs })(Home);
