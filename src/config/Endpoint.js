const endpoint = 'http://localhost:5000/';
const endpointApi = `${endpoint}api/v1/`;
const paths = {
    login:  `${endpointApi}auth/login`,
    menu:   `${endpointApi}auth/menu`,
    providers: `${endpointApi}providers/`,
    practitioners: `${endpointApi}practitioners/`
};
export default paths;