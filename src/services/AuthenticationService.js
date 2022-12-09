import axios from 'axios';
import paths from '../config/Endpoint';

const getUser = () => {
    return getCredentials();
}


const doLogin = async (data) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
    var response;
    const res = await axios.post(paths.login, data, config)
        .then(function (res){
            response = {status: true, data: res.data}
        })
        .catch(function (err) {
            console.log(err.response);
            response = { status: false, data: err.response };
        });
    return response;
}

const setCredentials = (data) => {
    localStorage.setItem('access_token', data);
}

const getCredentials = () => {
    var access_token;
    access_token = localStorage.getItem('access_token');
    return access_token
}

const deleteCredentials = () => {
    localStorage.clear()
}


const AuthenticationService = {
    Login: doLogin,
    setToken: setCredentials,
    getToken: getCredentials,
    deleteToken: deleteCredentials,
    getUser: getUser,
}
export default AuthenticationService;