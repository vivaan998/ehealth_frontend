import axios from 'axios';
import paths from '../config/Endpoint';
import AuthenticationService from './AuthenticationService';


const createProvider = async (data) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + AuthenticationService.getToken(),
        }
    }
    var response;
    const res = await axios.post(paths.providers, data, config)
        .then(function (res){
            response = {status: true, data: res.data}
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}


const ProviderService = {
    createProvider: createProvider,
}
export default ProviderService;