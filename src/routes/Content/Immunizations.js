import React from "react";
import ImmunizationsTable from "../Tables/ExtendedTable/components/ImmunizationsTable";
import { Container } from "./../../components";
import { HeaderMain } from "./../components/HeaderMain";

class Immunizations extends React.Component {
    constructor(props) {
        super(props);
        console.log("Immunizations props", props);
    }
    render() {
        return (
            <Container>
                <HeaderMain title="Immunizations" className="mb-5 mt-4" />
                <ImmunizationsTable {...this.props} />
            </Container>
        );
    }
};

export default Immunizations;
