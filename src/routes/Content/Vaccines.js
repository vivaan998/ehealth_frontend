import React from "react";
import VaccinesTable from "./../Tables/ExtendedTable/components/VaccinesTable";
import { Container } from "./../../components";
import { HeaderMain } from "./../components/HeaderMain";
import AuthenticationService from '../../services/AuthenticationService';

class Vaccines extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        if (AuthenticationService.getUser()){
            console.log('succeed');
        }
        else{
            this.props.history.push({
                pathname: "/login",
            })
        }
    }

    render(){
        return(
            <Container>
                <HeaderMain title="Vaccines" className="mb-5 mt-4" />
                <VaccinesTable {...this.props} />
            </Container>
        )
    }
}

export default Vaccines;
