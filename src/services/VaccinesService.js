import axios from 'axios';
import paths from '../config/Endpoint';
import AuthenticationService from './AuthenticationService';

const getVaccines = async (data) => {
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
    const res = await axios.get(paths.vaccines, config)
        .then(function (res){
            response = {status: true, data: res.data}
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}


const createVaccine = async (data) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        }
    }
    var response;
    const res = await axios.post(paths.vaccines, data, config)
        .then(function (res){
            response = {status: true, data: res.data}
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}



const VaccinesService = {
    getVaccines: getVaccines,
    createVaccine: createVaccine,
}
export default VaccinesService;