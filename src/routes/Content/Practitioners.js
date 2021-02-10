import React from 'react';
import PractitionersTable from "./../Tables/ExtendedTable/components/PractitionersTable";
import { Container } from "./../../components";
import { HeaderMain } from "./../components/HeaderMain";

class Practitioners extends React.Component {
    constructor(props){
        super(props);
        console.log("practitioners props>>>", this.props);
    }

    render() {
        return (
            <Container>
                <HeaderMain title="Practitioners" className="mb-5 mt-4" />
                <PractitionersTable {...this.props} />
            </Container>
        );
    }
}

export default Practitioners;