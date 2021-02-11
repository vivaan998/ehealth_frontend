import React from 'react';
import PatientsTable from "./../Tables/ExtendedTable/components/PatientsTable";
import { Container } from "./../../components";
import { HeaderMain } from "./../components/HeaderMain";


class Patients extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container>
                <HeaderMain title="Patients" className="mb-5 mt-4" />
                <PatientsTable {...this.props} />
            </Container>
        )
    }
}

export default Patients;