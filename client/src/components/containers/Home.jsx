import React, {useEffect} from "react";
import PackOfDogs from "../dumbs/packOfDog/PackOfDogs";
import { connect } from "react-redux";
import { getDogs } from "../../redux/actions";

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
            <PackOfDogs dogs={props.dogs}/>
        </div>
    )
}

export default connect(mapStateToProps, { getDogs })(Home);