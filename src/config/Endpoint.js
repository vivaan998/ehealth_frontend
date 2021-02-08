const endpoint = 'http://192.168.0.106:5000/';
const endpointApi = `${endpoint}api/v1/`;
const paths = {
    login:  `${endpointApi}auth/login`,
    menu:   `${endpointApi}auth/menu`   
};
export default paths;