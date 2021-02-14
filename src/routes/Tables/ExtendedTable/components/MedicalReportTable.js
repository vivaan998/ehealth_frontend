import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
    Comparator,
    dateFilter,
} from "react-bootstrap-table2-filter";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import _ from "lodash";
import moment from "moment";

import {
    Button,
    ButtonGroup,
    UncontrolledModal,
    ModalHeader,
    ModalBody,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    FormText,
    ModalFooter,
    Label,
    CustomInput,
    Form,
    FormGroup,
} from "../../../../components";
import { CustomExportCSV } from "./CustomExportButton";
import { CustomSearch } from "./CustomSearch";
import { CustomPaginationPanel } from "./CustomPaginationPanel";
import { CustomSizePerPageButton } from "./CustomSizePerPageButton";
import { CustomPaginationTotal } from "./CustomPaginationTotal";

import AuthenticationService from '../../../../services/AuthenticationService';
import MedicalReportService from './../../../../services/MedicalReportService';
import Config from './../../../../config/Config';
import ProvidersService from './../../../../services/ProvidersService';
import PractitionersService from './../../../../services/PractitionersService';
import MaskedInput from 'react-text-mask';
import {
    createNumberMask,
} from 'text-mask-addons';
import DateTimePicker from 'react-datetime-picker';
import ImmunizationsService from './../../../../services/ImmunizationsService';
import VaccinesService from './../../../../services/VaccinesService';

const sortCaret = (order) => {
    if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

const bodyTempMask = createNumberMask({ prefix: '', suffix: 'F', allowDecimal: true });

export default class MedicalReportTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patient_detail: "",
            vitalsList: "",
            immunizationsList: "",
            nextPageVital: "",
            previousPageVital: "",
            nextPageImmunizations: "",
            previousPageImmunizations: "",
            appointmentsList: "",
            nextPageAppointments: '',
            previousPageAppointments: '',
            allProviders: [],
            provider: "",
            allPractitioners: [],
            practitioner: "",
            bpSys: "",
            bpSys_errorMessage: "",
            bpDia: "",
            bpDia_errorMessage: "",
            bodyTemp: "",
            bodyTemp_errorMessage: "",
            heartRate: "",
            heartRate_errorMessage: "",
            memo: "",
            memo_errorMessage: "",
            authenticationMessage: "",
            isLoading: false,
            provider_errorMessage: "",
            practitioner_errorMessage: "",
            vaccine: "",
            allVaccines: [],
            datetime: new Date(),
            datetime_errorMessage: "",

        }
        console.log("medical report table>>>", this.props);
    }

    getVital = async (page = null, search = null) => {
        try {
            console.log("immunizationsss", this.props.location.patient_id);
            const paramData = {
                page: page,
                search: search,
                patient_id: this.props.location.patient_id
            }
            const response = await MedicalReportService.getVitals(paramData);
            if (response.status == true) {
                this.setState({
                    vitalsList: response.data.result,
                    nextPageVital: response.data.next_page,
                    previousPageVital: response.data.previous_page,
                });
            }
            console.log("getVitals>>>", this.state.vitalsList);
        }
        catch (e) {
            console.log('error >>>', e);
            console.log(e, e.data);
        }
    }

    getImmunization = async (page = null, search = null) => {
        try {
            console.log("immunizationsss", this.props.location.patient_id);
            const paramData = {
                page: page,
                search: search
            }
            const response = await MedicalReportService.getImmunizations(paramData, this.props.location.patient_id);
            if (response.status == true) {
                this.setState({
                    immunizationsList: response.data.result,
                    nextPageImmunizations: response.data.next_page,
                    previousPageImmunizations: response.data.previous_page,
                });
            }
            console.log("getImmunizations>>>", this.state.immunizationsList);
        }
        catch (e) {
            console.log('error >>>', e);
            console.log(e, e.data);
        }
    }

    getAppointment = async (page = null, search = null) => {
        try {
            console.log("appointmentsss", this.props.location.patient_id);
            const paramData = {
                page: page,
                search: search
            }
            const response = await MedicalReportService.getAppointments(paramData, this.props.location.patient_id);
            if (response.status == true) {
                this.setState({
                    appointmentsList: response.data.result,
                    nextPageAppointments: response.data.next_page,
                    previousPageAppointments: response.data.previous_page,
                });
            }
            console.log("getAppointmentss>>>", this.state.appointmentsList);
        }
        catch (e) {
            console.log('error >>>', e);
            console.log(e, e.data);
        }
    }

    async getNameandEmailOfPatient() {
        try {
            const response = await MedicalReportService.getPatient(this.props.location.patient_id);
            console.log('data Medical Report Table >>>', response.data);
            if (response.status == true) {
                this.setState({
                    patient_detail: response.data.result[0],
                });
                this.getVital();
                this.getImmunization();
                this.getAppointment();
            }

        }
        catch (e) {
            console.log('error >>>', e);
            console.log(e, e.data);
        }

    }

    componentDidMount = async () => {
        if (AuthenticationService.getUser()) {
            this.getNameandEmailOfPatient();
            if (Config.getProfileData().role === 100) {
                console.log('in get all 100 providers');
                this.getAllProviders();
            }
            this.getAllVaccines();
        }
        else {
            this.props.history.push({
                pathname: "/login",
            })
        }
    }

    createVitalColumnDefinitions() {
        return [
            {
                dataField: "created_at",
                text: "Created Date",
                sort: true,
                sortCaret,
            },
            {
                dataField: "body_temp",
                text: "Body Temp",
                sort: true,
                // align: "center",
                sortCaret,
            }, {
                dataField: "bp_systolic",
                text: "BP Systolic",
                sort: true,
                // align: "center",
                sortCaret,

            }, {
                dataField: "bp_diastolic",
                text: "BP Diastolic",
                sort: true,
                // align: "center",
                sortCaret,

            },
            {
                dataField: "heart_rate",
                text: "Heart Rate",
                sort: true,
                // align: "center",
                sortCaret,

            },
            {
                dataField: "memo",
                text: "Memo",
                sort: true,
                // align: "center",
                sortCaret,

            },
            {
                dataField: "practitioner",
                text: "Practitioner",
                sort: true,
                // align: "center",
                sortCaret,

            },
            {
                dataField: "provider",
                text: "Provider",
                sort: true,
                // align: "center",
                sortCaret,

            }
        ];
    }

    createImmunizationsColumnDefinitions() {
        return [
            {
                dataField: "administered_dt",
                text: "Immunization Date",
                sort: true,
                sortCaret,
            },
            // {
            //     dataField: "patient",
            //     text: "Patient Name",
            //     sort: true,
            //     // align: "center",
            //     sortCaret,
            // }, 
            {
                dataField: "vaccine",
                text: "Vaccine Name",
                sort: true,
                // align: "center",
                sortCaret,

            }, {
                dataField: "practitioner",
                text: "Administered By",
                sort: true,
                // align: "center",
                sortCaret,

            }, {
                dataField: "provider",
                text: "Provider",
                sort: true,
                // align: "center",
                sortCaret,

            },
            // {
            //     text: "Action",
            //     // sort: true,
            //     // align: "center",
            //     // sortCaret,
            //     formatter: this.actionColButton,
            // },
        ];
    }

    createAppointmentsColumnDefinitions() {
        return [
            {
                dataField: "appointment_id",
                hidden: true,
                isKey: true
            },
            {
                dataField: 'appointment_date',
                text: 'Appointment Date',
                formatter: (cell) =>
                    moment(cell).format('DD/MM/YYYY'),
                sort: true,
                sortCaret
            }, {
                dataField: 'appointment_time',
                text: 'Appointment Time',
                sort: true,
                sortCaret
            },
            // {
            //     dataField: 'patient',
            //     text: 'Patient Name',
            //     sort: true,
            //     // align: "center",
            //     sortCaret,
            //     formatter: (cell) => (
            //         <span className="text-inverse">
            //             { cell}
            //         </span>
            //     ),
            // },
            {
                dataField: 'practitioner',
                text: 'Scheduled By',
                sort: true,
                sortCaret,
                formatter: (cell) => (
                    <span className="text-inverse">
                        { cell}
                    </span>
                ),
            }, {
                dataField: 'provider',
                text: 'Provider',
                sort: true,
                sortCaret,
                formatter: (cell) => (
                    <span className="text-inverse">
                        { cell}
                    </span>
                ),
            }, {
                dataField: 'created_at',
                text: 'Scheduled On',
                formatter: (cell) =>
                    moment(cell).format('DD/MM/YYYY'),
                sort: true,
                sortCaret
            }
            // {
            //     text: 'Action',
            //     formatter: this.actionColButton
            // }
        ];
    }

    getAllVaccines = async () => {
        try {
            const response = await VaccinesService.getAllVaccinesList();
            if (response.status == true) {
                this.setState({
                    allVaccines: response.data.data,
                    vaccine: (response.data.data)[0].vaccine_id,
                });
                console.log('all Vaccines List >>>', this.state.allVaccines);
            }
        }
        catch (e) {
            console.log('error >>>', e);
            console.log(e, e.data);
        }
    }

    getAllProviders = async () => {
        try {
            const response = await ProvidersService.getAllProvidersList();
            if (response.status == true) {
                this.setState({
                    allProviders: response.data.data,
                    provider: (response.data.data)[0].provider_id,
                });
                this.getAllPractitioners(this.state.provider);
                console.log('all Providers List >>>', this.state.allProviders);
            }
        }
        catch (e) {
            console.log('error >>>', e);
            console.log(e, e.data);
        }
    }

    getAllPractitioners = async (value) => {
        try {
            console.log('id >>>', value);
            const response = await PractitionersService.getAllPractitionersList(value);
            if (response.status == true) {
                if (response.data.data) {
                    this.setState({
                        allPractitioners: response.data.data,
                        practitioner: (response.data.data)[0].practitioner_id
                    });
                    // this.getAllPatients(this.state.practitioner);
                }
                else {
                    this.setState({
                        allPractitioners: [],
                    });
                }
                console.log('all practitioner List >>>', this.state.allPractitioners);
            }
        }
        catch (e) {
            console.log('error >>>', e);
            console.log(e, e.data);
        }
    }

    onChangeProvider(value) {
        this.getAllPractitioners(value);
        this.setState({
            provider: value
        });
    }

    onChangePractitioner(value) {
        // this.getAllPatients(value);
        this.setState({
            practitioner: value
        })
    }

    onChangeBpSys(value) {
        console.log("onchange BP>>>", value);
        this.setState({
            bpSys: "" + value
        })
    }

    onChangeBpDia(value) {
        this.setState({
            bpDia: value
        })
    }

    onChangeBodyTemp(value) {
        this.setState({
            bodyTemp: value
        })
    }

    onChangeHeartRate(value) {
        this.setState({
            heartRate: value
        })
    }

    onChangeMemo(value) {
        this.setState({
            memo: value
        })
    }

    async createVital() {
        this.setState({
            isLoading: true,
            authenticationMessage: "",
        })

        if (this.state.provider == "") {
            this.setState({
                provider_errorMessage: "Provider not available",
                isLoading: false,
            });
            return;
        } else {
            this.setState({
                provider_errorMessage: "",
            });
        }

        if (this.state.practitioner == "") {
            this.setState({
                practitioner_errorMessage: "Practitioner not available",
                isLoading: false,
            });
            return;
        } else {
            this.setState({
                practitioner_errorMessage: "",
            });
        }

        if (this.state.bpSys == "") {
            this.setState({
                bpSys_errorMessage: "Enter BP Systolic",
                isLoading: false,
            })
            return
        } else {
            this.setState({
                bpSys_errorMessage: "",
            })
        }

        if (this.state.bpDia == "") {
            this.setState({
                bpDia_errorMessage: "Enter BP Systolic",
                isLoading: false,

            })
            return
        } else {
            this.setState({
                bpDia_errorMessage: "",
            })
        }

        if (this.state.bodyTemp == "") {
            this.setState({
                bodyTemp_errorMessage: "Enter BP Systolic",
                isLoading: false,

            })
            return
        } else {
            this.setState({
                bodyTemp_errorMessage: "",
            })
        }

        if (this.state.heartRate == "") {
            this.setState({
                heartRate_errorMessage: "Enter BP Systolic",
                isLoading: false,

            })
            return
        } else {
            this.setState({
                heartRate_errorMessage: "",
            })
        }

        if (this.state.memo == "") {
            this.setState({
                memo_errorMessage: "Enter BP Systolic",
                isLoading: false,

            })
            return
        } else {
            this.setState({
                memo_errorMessage: "",
            })
        }

        const postData = {
            "provider_id": Number(this.state.provider),
            "practitioner_id": this.state.practitioner,
            "patient_id": this.props.location.patient_id,
            "bp_systolic": this.state.bpSys,
            "bp_diastolic": this.state.bpDia,
            "body_temp": this.state.bodyTemp,
            "heart_rate": this.state.heartRate,
            "memo": this.state.memo
        }

        try {
            console.log(postData);
            const response = await MedicalReportService.createVital(postData);
            if (response.status == true) {
                console.log(response.data);
                this.setState({
                    color: "success",
                    authenticationMessage: response.data.message,
                    isLoading: false,
                })
                this.getVital();
            } else {
                this.setState({
                    color: "danger",
                    isLoading: false,
                    authenticationMessage: response.data.data.error
                });
            }
        } catch (e) {
            console.log(e, e.data);
        }

    }

    onChangeVaccine(value) {
        this.setState({
            vaccine: value
        })
    }

    onChangeDatetime(value) {
        this.setState({
            datetime: value
        })
    }

    async createImmunization() {
        this.setState({
            isLoading: true,
            authenticationMessage: "",
        });

        if (this.state.provider == "") {
            this.setState({
                provider_errorMessage: "Provider not available",
                isLoading: false,
            });
            return;
        } else {
            this.setState({
                provider_errorMessage: "",
            });
        }

        if (this.state.practitioner == "") {
            this.setState({
                practitioner_errorMessage: "Practitioner not available",
                isLoading: false,
            });
            return;
        } else {
            this.setState({
                practitioner_errorMessage: "",
            });
        }

        if (this.state.patient == "") {
            this.setState({
                patient_errorMessage: "Patient not available",
                isLoading: false,
            });
            return;
        } else {
            this.setState({
                patient_errorMessage: "",
            });
        }

        if (this.state.vaccine == "") {
            this.setState({
                vaccine_errorMessage: "Vaccine not available",
                isLoading: false,
            });
            return;
        } else {
            this.setState({
                vaccine_errorMessage: "",
            });
        }

        if (this.state.datetime == "") {
            this.setState({
                date_errorMessage: "Date not available",
                isLoading: false,
            });
            return;
        } else {
            this.setState({
                date_errorMessage: "",
            });
            var formatedDateTime = moment
                .utc(moment(this.state.datetime, "YYYY-MM-DD HH:MM:SS"))
                .format();
            formatedDateTime = formatedDateTime.replace("T", " ").replace("Z", "");

            const postData = {
                "provider_id": Number(this.state.provider),
                "practitioner_id": this.state.practitioner,
                "patient_id": this.props.location.patient_id,
                "administered_dt": formatedDateTime,
                "vaccine_id": Number(this.state.vaccine),
            };
            try {
                console.log(postData);
                const response = await ImmunizationsService.createImmunizations(
                    postData
                );
                if (response.status == true) {
                    console.log(response.data);
                    this.setState({
                        color: "success",
                        authenticationMessage: response.data.message,
                        isLoading: false,
                    });
                    this.getImmunization();
                } else {
                    this.setState({
                        color: "danger",
                        isLoading: false,
                        authenticationMessage: response.data.data.error,
                    });
                }
            } catch (e) {
                console.log(e, e.data);
            }
        }
    }

    render() {
        const vitalColumnDefs = this.createVitalColumnDefinitions();
        const immunizationsColumnDefs = this.createImmunizationsColumnDefinitions();
        const appointmentsColumnDefs = this.createAppointmentsColumnDefinitions();
        return (
            <>
                <ToolkitProvider
                    keyField="patient_id"
                    data={this.state.vitalsList}
                    columns={vitalColumnDefs}
                >
                    {
                        props => (
                            <React.Fragment>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <h3>Table of Vitals</h3>
                                    <div className="d-flex ml-auto">
                                        <ButtonGroup>
                                            <Button size="sm" outline id="newVitalButton">
                                                {/* <i className="fa fa-fw fa-plus"></i> */}
                                                Add New Vital
                                            </Button>
                                            <UncontrolledModal target="newVitalButton" className="modal-outline-primary">
                                                <ModalHeader tag="h5">
                                                    New Vital
                                        </ModalHeader>
                                                <ModalBody>
                                                    <Form>
                                                        <FormGroup row>
                                                            <Label for="provider" sm={4}>
                                                                Provider Name
                                                            </Label>
                                                            <Col sm={8}>
                                                                {Config.getProfileData().role === 100 ? (
                                                                    <Input
                                                                        type="select"
                                                                        name="select"
                                                                        id="provider"
                                                                        value={(this.state.provider)}
                                                                        onChange={e => this.onChangeProvider(e.target.value)}
                                                                    >

                                                                        {this.state.allProviders.map((obj) => <option value={obj.provider_id}>{obj.name}</option>)}

                                                                    </Input>
                                                                ) : (
                                                                        Config.getProfileData().role === 50 ? (
                                                                            <option>{Config.getProfileData().name}</option>
                                                                        ) : (
                                                                                Config.getProfileData().role === 10 ? (
                                                                                    <option>{Config.getProfileData().name}</option>
                                                                                ) : (
                                                                                        <option>{Config.getProfileData().name}</option>
                                                                                    )
                                                                            )

                                                                    )}
                                                                <FormText color="danger">
                                                                    {this.state.provider_errorMessage}
                                                                </FormText>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="practitioner" sm={4}>
                                                                Practitioner Name
                                                            </Label>
                                                            <Col sm={8}>
                                                                {(Config.getProfileData().role === 100) || (Config.getProfileData().role === 50) ? (
                                                                    <Input
                                                                        type="select"
                                                                        name="select"
                                                                        id="practitioner"
                                                                        value={(this.state.practitioner)}
                                                                        onChange={e => this.onChangePractitioner(e.target.value)}
                                                                    >

                                                                        {this.state.allPractitioners.map((obj) => <option value={obj.practitioner_id}>{obj.name}</option>)}

                                                                    </Input>
                                                                ) : (
                                                                        <option>{Config.getProfileData().name}</option>
                                                                    )}
                                                                <FormText color="danger">
                                                                    {this.state.practitioner_errorMessage}
                                                                </FormText>

                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="bp_systolic" sm={4}>
                                                                BP Systolic
                                                            </Label>
                                                            <Col sm={8}>
                                                                <Input
                                                                    type="text"
                                                                    value={this.state.bpSys}
                                                                    className='text-left form-control'
                                                                    placeholder='Enter BP systolic'
                                                                    // tag={MaskedInput}
                                                                    id="bp_systolic"
                                                                    onChange={e => this.onChangeBpSys(e.target.value)}
                                                                />
                                                                <FormText color="danger">
                                                                    {this.state.bpSys_errorMessage}
                                                                </FormText>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="bp_diastolic" sm={4}>
                                                                BP Diastolic
                                                            </Label>
                                                            <Col sm={8}>
                                                                <Input
                                                                    value={this.state.bpDia}
                                                                    onChange={e => this.onChangeBpDia(e.target.value)}
                                                                    className='text-left form-control'
                                                                    placeholder='Enter BP Diastolic'
                                                                    // tag={MaskedInput}
                                                                    id="bp_diastolic"
                                                                />
                                                                <FormText color="danger">
                                                                    {this.state.bpDia_errorMessage}
                                                                </FormText>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="body_temp" sm={4}>
                                                                Body Temp
                                                            </Label>
                                                            <Col sm={8}>
                                                                <Input
                                                                    value={this.state.bodyTemp}
                                                                    onChange={e => this.onChangeBodyTemp(e.target.value)}
                                                                    mask={bodyTempMask}
                                                                    className='text-left form-control'
                                                                    placeholder='Enter Body Temp'
                                                                    tag={MaskedInput}
                                                                    id="body_temp"
                                                                />
                                                                <FormText color="danger">
                                                                    {this.state.bodyTemp_errorMessage}
                                                                </FormText>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="heart_rate" sm={4}>
                                                                Heart Rate
                                                            </Label>
                                                            <Col sm={8}>
                                                                <Input
                                                                    value={this.state.heartRate}
                                                                    onChange={e => this.onChangeHeartRate(e.target.value)}
                                                                    className='text-left form-control'
                                                                    placeholder='Enter Heart Rate'
                                                                    // tag={MaskedInput}
                                                                    id="heart_rate"
                                                                />
                                                                <FormText color="danger">
                                                                    {this.state.heartRate_errorMessage}
                                                                </FormText>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="memo" sm={4}>
                                                                Memo
                                                            </Label>
                                                            <Col sm={8}>
                                                                <Input
                                                                    onChange={e => this.onChangeMemo(e.target.value)}
                                                                    className='text-left form-control'
                                                                    placeholder='Enter Memo'
                                                                    // tag={MaskedInput}
                                                                    id="memo"
                                                                />
                                                                <FormText color="danger">
                                                                    {this.state.memo_errorMessage}
                                                                </FormText>
                                                            </Col>
                                                        </FormGroup>
                                                    </Form>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <FormText color={this.state.color}>
                                                        {this.state.authenticationMessage}
                                                    </FormText>
                                                    <UncontrolledModal.Close color="link">
                                                        Discard
                                                    </UncontrolledModal.Close>
                                                    <Button color="primary" onClick={() => this.createVital()} disabled={this.state.isLoading}>
                                                        Create
                                                    </Button>
                                                </ModalFooter>
                                            </UncontrolledModal>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <BootstrapTable
                                    classes="table-responsive-sm"
                                    filter={filterFactory()}
                                    bordered={false}
                                    responsive
                                    {...props.baseProps}
                                />

                                <ButtonGroup>
                                    <Button size="sm" outline onClick={() => { this.getVital(this.state.previousPageVital, null) }} disabled={(this.state.previousPageVital) ? false : true}>
                                        <i className="fa fa-fw fa-chevron-left"></i>
                                    </Button>
                                    <Button size="sm" outline onClick={() => { this.getVital(this.state.nextPageVital, null) }} disabled={(this.state.nextPageVital) ? false : true}>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                    </Button>
                                </ButtonGroup>

                            </React.Fragment>
                        )
                    }
                </ToolkitProvider>
                <br/><br/><br/>
                <ToolkitProvider
                    keyField="patient_id"
                    data={this.state.immunizationsList}
                    columns={immunizationsColumnDefs}
                >
                    {
                        props => (
                            <React.Fragment>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <h3>Table of Immunizations</h3>
                                    <div className="d-flex ml-auto">
                                        <ButtonGroup>
                                            <Button
                                                size="sm"
                                                outline
                                                id="createImmunization"
                                            >
                                                {/* <i className="fa fa-fw fa-plus"></i> */}
                                                Add New Immunization
                                            </Button>
                                            <UncontrolledModal target="createImmunization" className="modal-outline-primary">
                                                <ModalHeader tag="h5">
                                                    New Immunization
                                        </ModalHeader>
                                                <ModalBody>
                                                    <Form>
                                                        <FormGroup row>
                                                            <Label for="provider" sm={4}>
                                                                Provider Name
                                                            </Label>
                                                            <Col sm={8}>
                                                                {Config.getProfileData().role === 100 ? (
                                                                    <Input
                                                                        type="select"
                                                                        name="select"
                                                                        id="provider"
                                                                        value={(this.state.provider)}
                                                                        onChange={e => this.onChangeProvider(e.target.value)}
                                                                    >

                                                                        {this.state.allProviders.map((obj) => <option value={obj.provider_id}>{obj.name}</option>)}

                                                                    </Input>
                                                                ) : (
                                                                        Config.getProfileData().role === 50 ? (
                                                                            <option>{Config.getProfileData().name}</option>
                                                                        ) : (
                                                                                Config.getProfileData().role === 10 ? (
                                                                                    <option>{Config.getProfileData().name}</option>
                                                                                ) : (
                                                                                        <option>{Config.getProfileData().name}</option>
                                                                                    )
                                                                            )

                                                                    )}
                                                                <FormText color="danger">
                                                                    {this.state.provider_errorMessage}
                                                                </FormText>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="practitioner" sm={4}>
                                                                Practitioner Name
                                                            </Label>
                                                            <Col sm={8}>
                                                                {(Config.getProfileData().role === 100) || (Config.getProfileData().role === 50) ? (
                                                                    <Input
                                                                        type="select"
                                                                        name="select"
                                                                        id="practitioner"
                                                                        value={(this.state.practitioner)}
                                                                        onChange={e => this.onChangePractitioner(e.target.value)}
                                                                    >

                                                                        {this.state.allPractitioners.map((obj) => <option value={obj.practitioner_id}>{obj.name}</option>)}

                                                                    </Input>
                                                                ) : (
                                                                        <option>{Config.getProfileData().name}</option>
                                                                    )}
                                                                <FormText color="danger">
                                                                    {this.state.practitioner_errorMessage}
                                                                </FormText>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="vaccine" sm={4}>
                                                                Vaccine Name
                                                    </Label>
                                                            <Col sm={8}>
                                                                <Input
                                                                    type="select"
                                                                    name="select"
                                                                    id="vaccine"
                                                                    value={(this.state.vaccine)}
                                                                    onChange={e => this.onChangeVaccine(e.target.value)}
                                                                >
                                                                    {this.state.allVaccines.map((obj) => <option value={obj.vaccine_id}>{obj.name}</option>)}
                                                                </Input>

                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Label for="datetime" sm={4}>
                                                                Date and Time
                                                    </Label>
                                                            <Col sm={8}>

                                                                <DateTimePicker
                                                                    value={(this.state.datetime)}
                                                                    onChange={value => this.onChangeDatetime(value)}

                                                                />
                                                                <FormText color="danger">
                                                                    {this.state.datetime_errorMessage}
                                                                </FormText>
                                                            </Col>
                                                        </FormGroup>
                                                    </Form>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <FormText color={this.state.color}>
                                                        {this.state.authenticationMessage}
                                                    </FormText>
                                                    <UncontrolledModal.Close color="link">
                                                        Discard
                                                    </UncontrolledModal.Close>
                                                    <Button color="primary" onClick={() => this.createImmunization()} disabled={this.state.isLoading}>
                                                        Create
                                                    </Button>
                                                </ModalFooter>
                                            </UncontrolledModal>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <BootstrapTable
                                    classes="table-responsive-sm"
                                    filter={filterFactory()}
                                    bordered={false}
                                    responsive
                                    {...props.baseProps}
                                />

                                <ButtonGroup>
                                    <Button size="sm" outline onClick={() => { this.getImmunization(this.state.previousPageImmunizations, null) }} disabled={(this.state.previousPageImmunizations) ? false : true}>
                                        <i className="fa fa-fw fa-chevron-left"></i>
                                    </Button>
                                    <Button size="sm" outline onClick={() => { this.getImmunization(this.state.nextPageImmunizations, null) }} disabled={(this.state.nextPageImmunizations) ? false : true}>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                    </Button>
                                </ButtonGroup>

                            </React.Fragment>
                        )
                    }
                </ToolkitProvider>
                <br/><br/><br/>
                <ToolkitProvider
                    keyField="patient_id"
                    data={this.state.appointmentsList}
                    columns={appointmentsColumnDefs}
                >
                    {
                        props => (
                            <React.Fragment>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <h3>Table of Appointments</h3>
                                    <div className="d-flex ml-auto">
                                        <ButtonGroup>
                                            <Button
                                                size="sm"
                                                outline
                                            // onClick={this.handleAddRow.bind(this)}
                                            >
                                                {/* <i className="fa fa-fw fa-plus"></i> */}
                                                Add New Appointment
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <BootstrapTable
                                    classes="table-responsive-sm"
                                    filter={filterFactory()}
                                    bordered={false}
                                    responsive
                                    {...props.baseProps}
                                />

                                <ButtonGroup>
                                    <Button size="sm" outline onClick={() => { this.getAppointment(this.state.previousPageAppointments, null) }} disabled={(this.state.previousPageAppointments) ? false : true}>
                                        <i className="fa fa-fw fa-chevron-left"></i>
                                    </Button>
                                    <Button size="sm" outline onClick={() => { this.getAppointment(this.state.nextPageAppointments, null) }} disabled={(this.state.nextPageAppointments) ? false : true}>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                    </Button>
                                </ButtonGroup>

                            </React.Fragment>
                        )
                    }
                </ToolkitProvider>
            </>
        );
    }
}