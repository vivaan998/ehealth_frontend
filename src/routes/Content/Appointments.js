import React from 'react';
import AppointmentsTable from './../Tables/ExtendedTable/components/AppointmentsTable';
import { Container } from './../../components';
import { HeaderMain } from './../components/HeaderMain';

const Appointments = () => {
    return(
        <Container>
            <HeaderMain title="Appointments" className="mb-5 mt-4"/>
            <AppointmentsTable />
        </Container>
    );
}

export default Appointments;