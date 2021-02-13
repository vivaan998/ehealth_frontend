import axios from 'axios';
import paths from '../config/Endpoint';
import AuthenticationService from './AuthenticationService';

const getPatient = async (patient_id) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        },
    }
    var response;
    const res = await axios.get(paths.get_patient_by_id+patient_id, config)
        .then(function (res) {
            response = { status: true, data: res.data }
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}

const getVitals = async (data) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        },
        params: {
            page: data.page,
            search: data.search,
            patient_id: data.patient_id
        }
    }
    var response;
    const res = await axios.get(paths.vitals,config)
        .then(function (res){
            response = {status: true, data: res.data}
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}

const getImmunizations = async (data, patient_id) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        },
        params: {
            page: data.page,
            search: data.search,
        }
    }
    var response;
    const res = await axios.get(paths.get_immunizations_of_patient+patient_id,config)
        .then(function (res){
            response = {status: true, data: res.data}
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}

const getAppointments = async (data, patient_id) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        },
        params: {
            page: data.page,
            search: data.search,
        }
    }
    var response;
    const res = await axios.get(paths.get_appointmentd_of_patient+patient_id,config)
        .then(function (res){
            response = {status: true, data: res.data}
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}

const MedicalReportService = {
    getPatient: getPatient,
    getVitals: getVitals,
    getImmunizations: getImmunizations,
    getAppointments: getAppointments,
}

export default MedicalReportService;