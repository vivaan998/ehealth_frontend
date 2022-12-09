import React from 'react';
import AppointmentsTable from './../Tables/ExtendedTable/components/AppointmentsTable';
import { Container } from './../../components';
import { HeaderMain } from './../components/HeaderMain';

class Appointments extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <HeaderMain title="Appointments" className="mb-5 mt-4" />
                <AppointmentsTable {...this.props} />
            </Container>
        );
    }
}

export default Appointments;