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
    const res = await axios.get(paths.practitioners, config)
        .then(function (res){
            response = {status: true, data: res.data}
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}


const immunizationOfThisProvider = async (data) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        }
    }
    var response;
    var apiPath = paths.get_practitioners_of_this_provider + data;
    console.log('api path >>>', apiPath);
    const res = await axios.get(apiPath, config)
        .then(function (res){
            response = {status: true, data: res.data}
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}



const PractitionersService = {
    getList: getList,
    immunizationOfThisProvider: immunizationOfThisProvider
}
export default PractitionersService;