const endpoint = 'http://localhost:5000/';
const endpointApi = `${endpoint}api/v1/`;
const paths = {
    login:              `${endpointApi}auth/login`,
    menu:               `${endpointApi}auth/menu`,
    providers:          `${endpointApi}providers/`,
    vaccines:           `${endpointApi}vaccines/`,
    practitioners:      `${endpointApi}practitioners/`,
    patients:           `${endpointApi}patients/`,
    immunizations:      `${endpointApi}immunizations/`,
    appointments:       `${endpointApi}appointments/`,
    get_all_providers:  `${endpointApi}get-providers/`,
    get_all_practitioners: `${endpointApi}get-practitioners/`,
    get_all_patients:   `${endpointApi}get-patients/`,
    get_all_vaccines:   `${endpointApi}get-vaccines/`,
    get_practitioners_of_this_provider: `${endpointApi}super-user-practitioner/`


};
export default paths;