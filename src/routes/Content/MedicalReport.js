import React from 'react';
import { Container } from './../../components';
import { HeaderMain } from './../components/HeaderMain';
import MedicalReportService from './../../services/MedicalReportService';
import AuthenticationService from './../../services/AuthenticationService';
import Config from './../../config/Config';
import MedicalReportTable from '../Tables/ExtendedTable/components/MedicalReportTable';

class MedicalReport extends React.Component {
    constructor(props){
        super(props);
        console.log("Medical report props>>>", this.props);
        this.state = {
            patient_detail: "",
        }
    }

    async getNameandEmailOfPatient(){
        try {
            const response = await MedicalReportService.getPatient(this.props.location.patient_id);
            console.log('data Medical Report >>>', response.data);
            if (response.status == true) {
                this.setState({
                    patient_detail: response.data.result[0],
                });
            }

        }
        catch (e) {
            console.log('error >>>', e);
            console.log(e, e.data);
        }

    }

    componentDidMount = async () => {
        if (AuthenticationService.getUser()) {
            console.log('profile', Config.getProfileData());
            this.getNameandEmailOfPatient();
        }
        else {
            this.props.history.push({
                pathname: "/login",
            })
        }
    }

    render() {
        return (
            <Container>
                
                <h5>Patient Name: {this.state.patient_detail.first_name+" "+this.state.patient_detail.last_name} </h5>
                <h5>Patient Email: {this.state.patient_detail.email_tx} </h5> <br/><br/>
                <MedicalReportTable {...this.props} />
            </Container>
        );
    }
}

export default MedicalReport;