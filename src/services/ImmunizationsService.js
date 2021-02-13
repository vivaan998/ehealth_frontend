import axios from 'axios';
import paths from '../config/Endpoint';
import AuthenticationService from './AuthenticationService';

const getList = async (data) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        },
        params: {
            page: data.page,
            search: data.search
        }
    }
    var response;
    const res = await axios.get(paths.immunizations, config)
        .then(function (res) {
            response = { status: true, data: res.data }
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}

const createImmunizations = async (data) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        }
    }
    var response;
    const res = await axios.post(paths.immunizations, data, config)
        .then(function (res) {
            response = { status: true, data: res.data }
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}

const archiveImmunization = async (data) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        }
    }
    var response;
    const res = await axios.put(paths.immunizations, data, config)
        .then(function (res) {
            response = { status: true, data: res.data }
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}

// const getAllProvidersList = async (data) => {
//     const config = {
//         headers: {
//             'accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Authorization': 'Bearer ' + AuthenticationService.getToken(),
//         }
//     }
//     var response;
//     const res = await axios.get(paths.get_all_providers, config)
//         .then(function (res){
//             response = {status: true, data: res.data}
//         })
//         .catch(function (err) {
//             console.log(err.response);
//             response = { status: false, data: err.response };
//         });
//     return response;
// }

const immunizationOfThisVaccine = async (data, vaccine_id) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        },
        params: {
            page: data.page,
            search: data.search
        }
    }
    var response;
    var apiPath = paths.get_immunizations_of_this_vaccine + vaccine_id;
    // console.log('api path >>>', apiPath);
    const res = await axios.get(apiPath, config)
        .then(function (res) {
            response = { status: true, data: res.data }
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}

const immunizationOfThisPractitioner = async (data, practitioner_id) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        },
        params: {
            page: data.page,
            search: data.search
        }
    }
    var response;
    var apiPath = paths.get_immunizations_of_this_practitioner + practitioner_id;
    // console.log('api path >>>', apiPath);
    const res = await axios.get(apiPath, config)
        .then(function (res) {
            response = { status: true, data: res.data }
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}

const ImmunizationsService = {
    getList: getList,
    createImmunizations: createImmunizations,
    archiveImmunization: archiveImmunization,
    immunizationOfThisVaccine: immunizationOfThisVaccine,
    immunizationOfThisPractitioner: immunizationOfThisPractitioner
}
export default ImmunizationsService;
