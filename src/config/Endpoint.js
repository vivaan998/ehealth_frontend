const endpoint = 'http://localhost:5000/';
const endpointApi = `${endpoint}api/v1/`;
const paths = {
    login:              `${endpointApi}auth/login`,
    menu:               `${endpointApi}auth/menu`,
    providers:          `${endpointApi}providers/`,
    vaccines:           `${endpointApi}vaccines/`,
    practitioners:      `${endpointApi}practitioners/`,
    patients:           `${endpointApi}patients/`,
    get_all_providers:  `${endpointApi}get-providers/`,
    get_all_practitioners: `${endpointApi}get-practitioners/`,
    get_practitioners_of_this_provider: `${endpointApi}super-user-practitioner/`


};
export default paths;