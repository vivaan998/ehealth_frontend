import React from 'react';
import AdvancedTableA from './../Tables/ExtendedTable/components/AdvancedTableA';
import { Container } from './../../components';
import { HeaderMain } from './../components/HeaderMain';

const Appointments = () => {
    return(
        <Container>
            <HeaderMain title="Appointments" className="mb-5 mt-4"/>
            <AdvancedTableA />
        </Container>
    );
}

export default Appointments;