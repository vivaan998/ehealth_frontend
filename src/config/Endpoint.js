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
    get_practitioners_of_this_provider: `${endpointApi}super-user-practitioner/`,
    get_immunizations_of_this_vaccine: `${endpointApi}vaccine-administered-to/`,
    get_immunizations_of_this_practitioner: `${endpointApi}get-immunizations-practitioner/`,
    get_appointments_of_this_practitioner: `${endpointApi}get-appointments-practitioner/`,
    get_patient_by_id: `${endpointApi}super-user-patients/`,
    vitals: `${endpointApi}vitals/`,
    get_immunizations_of_patient: `${endpointApi}get-immunizations-patient/`,
    get_appointmentd_of_patient : `${endpointApi}get-appointments-patient/`,
    get_appointments_of_provider : `${endpointApi}get-appointments-provider/`
};
export default paths;