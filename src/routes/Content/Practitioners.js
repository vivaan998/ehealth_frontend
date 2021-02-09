import React from 'react';
import PractitionersTable from "./../Tables/ExtendedTable/components/PractitionersTable";
import { Container } from "./../../components";
import { HeaderMain } from "./../components/HeaderMain";

const Practitioners = () => {
    return(
        <Container>
            <HeaderMain title="Practitioners" className="mb-5 mt-4" />
            <PractitionersTable />
        </Container>
    );
}

export default Practitioners;