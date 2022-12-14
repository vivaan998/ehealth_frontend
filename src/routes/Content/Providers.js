import React from "react";
import ProvidersTable from "./../Tables/ExtendedTable/components/ProvidersTable";
import { Container } from "./../../components";
import { HeaderMain } from "./../components/HeaderMain";

class Providers extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Container>
                <HeaderMain title="Providers" className="mb-5 mt-4" />
                <ProvidersTable {...this.props} />
            </Container>
        );
    }
}

export default Providers;
