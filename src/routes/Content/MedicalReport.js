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
            patient_detail: '',
            isGettingPatientDetails: false
        }
    }

    async getNameandEmailOfPatient(){
        try {
            this.setState({
                isGettingPatientDetails: false
            });
            const response = await MedicalReportService.getPatient(this.props.location.patient_id);
            console.log('response data >>>', response);
            if (response.status == true && (response.data.result).length > 0) {
                this.setState({
                    patient_detail: response.data.result[0],
                    isGettingPatientDetails: true
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
                
                <h5><strong>Patient Name:</strong> {this.state.isGettingPatientDetails ? this.state.patient_detail.first_name+" "+this.state.patient_detail.last_name : 'No name'}</h5>
                <h5><strong>Patient Email:</strong> {this.state.isGettingPatientDetails ? this.state.patient_detail.email_tx : 'No email Id available'} </h5> <br/><br/>
                <MedicalReportTable {...this.props} />
            </Container>
        );
    }
}

export default MedicalReport;