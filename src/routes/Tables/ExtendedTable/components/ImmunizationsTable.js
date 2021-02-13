import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
    Comparator,
    dateFilter,
} from "react-bootstrap-table2-filter";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import _ from "lodash";
// import moment from "moment";

import {
    // Badge,
    Button,
    // CustomInput,
    // StarRating,
    ButtonInput,
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
    Form,
    FormGroup,
} from "../../../../components";
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import { CustomSearch } from "./CustomSearch";
import Config from './../../../../config/Config';
import ImmunizationsService from "../../../../services/ImmunizationsService";
import AuthenticationService from "../../../../services/AuthenticationService";
import ProvidersService from "../../../../services/ProvidersService";
import PractitionersService from "../../../../services/PractitionersService";
import PatientsService from "../../../../services/PatientsService";
import VaccinesService from "../../../../services/VaccinesService";
import DateTimePicker from 'react-datetime-picker';

const sortCaret = (order) => {
    if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

setDefaultLocale('es');
export default class ImmunizationsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            immunizationsList: [],
            date: '',
            time: '',
            practitioner: '',
            patient: '',
            provider: '',
            vaccine: '',
            date_errorMessage: '',
            time_errorMessage: '',
            practitioner_errorMessage: '',
            patient_errorMessage: '',
            provider_errorMessage: '',
            vaccine_errorMessage: '',
            authenticationMessage: '',
            color: "black",
            isLoading: false,
            name: '',
            nextPage: '',
            previousPage: '',
            allProviders: [],
            allPractitioners: [],
            allPatients: [],
            allVaccines: [],
            searchValue: null,
            archiveMessage: "",
            isArchiving: false,
            datetime: new Date(),
            vaccineDate: moment(moment().utc().format("YYYY/MM/DD")).toDate(),
        };

        this.headerCheckboxRef = React.createRef();
    }

    getList = async (page = null, search = null) => {
        try {
            const paramData = {
                page: page,
                search: search
            }

            if (this.props.location.practitioner_id) {
                const response = await ImmunizationsService.immunizationOfThisPractitioner(paramData, this.props.location.practitioner_id);
                if (response.status == true) {
                    this.setState({
                        immunizationsList: response.data.result,
                        nextPage: response.data.next_page,
                        previousPage: response.data.previous_page
                    });
                }

            } else if (this.props.location.vaccine_id) {
                const response = await ImmunizationsService.immunizationOfThisVaccine(paramData, this.props.location.vaccine_id);
                if (response.status == true) {
                    this.setState({
                        immunizationsList: response.data.result,
                        nextPage: response.data.next_page,
                        previousPage: response.data.previous_page
                    });
                }
            } else {
                const response = await ImmunizationsService.getList(paramData);
                if (response.status == true) {
                    this.setState({
                        immunizationsList: response.data.result,
                        nextPage: response.data.next_page,
                        previousPage: response.data.previous_page,
                    });
                }
            }
            console.log('immunizationList >>>', this.state.immunizationsList);

        }
        catch (e) {
            console.log('error >>>', e);
            console.log(e, e.data);
        }
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
                console.log('all Providers List >>>', this.state.allProviders);
                this.getAllPractitioners(this.state.provider);
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
                    this.getAllPatients(this.state.practitioner);
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
    getAllPatients = async (value) => {
        try {
            console.log('id >>>', value);
            const response = await PatientsService.getAllPatientsList(value);
            if (response.status == true) {
                console.log('>>>', response.data.data);
                if (response.data.data) {
                    this.setState({
                        allPatients: response.data.data,
                        patient: (response.data.data)[0].patient_id
                    });
                }
                else {
                    this.setState({
                        allPatients: [],
                    });
                }
                console.log('all practitioner List >>>', this.state.allPatients);
            }
        }
        catch (e) {
            console.log('error >>>', e);
            console.log(e, e.data);
        }
    }

    componentDidMount = async () => {
        if (AuthenticationService.getUser()) {
            this.getList();
            this.getAllVaccines();
            if (Config.getProfileData().role === 100) {
                console.log('in get all 100 providers');
                this.getAllProviders();
            }
            if (Config.getProfileData().role === 50) {
                console.log('In 50');
                this.getAllPractitioners(Config.getProfileData().id);
            }
            if (Config.getProfileData().role === 10) {
                this.getAllPatients(Config.getProfileData().id);
            }
        }
        else {
            this.props.history.push({
                pathname: "/login",
            })
        }
    }
    onChangeProvider(value) {
        console.log('provider_id >>>', value);
        this.getAllPractitioners(value);
        this.setState({
            provider: value
        })
    }

    onChangePractitioner(value) {
        console.log('provider_id >>>', value);
        this.getAllPatients(value);
        this.setState({
            practitioner: value
        })
    }

    onChangePatient(value) {
        this.setState({
            patient: value
        })
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

    _handleChangeStart = (startDate) => (
        this.setState({ vaccineDate: startDate })
    )

    async handleArchiveOnClick(cell, row) {
        console.log("Archive button clicked:", row.immunization_id);
        const data = {
            "immunization_id": row.immunization_id
        }
        try {
            this.setState({
                isArchiving: true
            });
            const response = await ImmunizationsService.archiveImmunization(data);
            if (response.status == true) {
                console.log(response.data);
                this.setState({
                    archiveMessage: "Immunization archived successfully",
                    isArchiving: false
                });
                this.getList();

            }
            else {
                this.setState({
                    archiveMessage: response.data.data.error,
                    isArchiving: false
                });
            }
            console.log("archive Immunization>>>", this.state.archiveMessage);
        }
        catch (e) {
            console.log(e, e.data)
        }
    }

    actionColButton = (cell, row) => {
        return (
            <ButtonGroup>
                <Button
                    size="sm"
                    outline
                    color="danger"
                    onClick={() => this.handleArchiveOnClick(cell, row)}
                    disabled={this.state.isArchiving}
                >
                    {this.state.isArchiving ? 'Archiving...' : 'Archive'}
                </Button>
            </ButtonGroup>
        );
    };
    createColumnDefinitions() {
        return [
            {
                dataField: "administered_dt",
                text: "Immunization Date",
                sort: true,
                sortCaret,
            },
            {
                dataField: "patient",
                text: "Patient Name",
                sort: true,
                // align: "center",
                sortCaret,
            }, {
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

            },
            {
                text: "Action",
                // sort: true,
                // align: "center",
                // sortCaret,
                formatter: this.actionColButton,
            },
        ];
    }
    handleCallback = async (childData) => {
        this.getList(null, childData);
    }

    render() {
        const columnDefs = this.createColumnDefinitions();
        return (
            <ToolkitProvider
                keyField="id"
                data={this.state.immunizationsList}
                columns={columnDefs}
                exportCSV
            >
                {(props) => (
                    <React.Fragment>
                        <div className="d-flex justify-content-end align-items-center mb-2">
                            <div className="d-flex ml-auto">
                                <CustomSearch className="mr-2" {...props.searchProps} parentCallBack={this.handleCallback} />
                                <ButtonGroup>
                                    <Button size="sm" outline id="modalDefault301">
                                        <i className="fa fa-fw fa-plus"></i>
                                    </Button>
                                    <UncontrolledModal target="modalDefault301" className="modal-outline-primary">
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
                                                                <option>{Config.getProfileData().name}</option>
                                                            )}

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

                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="patient" sm={4}>
                                                        Patient Name
                                    </Label>
                                                    <Col sm={8}>
                                                        {(Config.getProfileData().role === 100) || (Config.getProfileData().role === 50) || (Config.getProfileData().role === 10) ? (
                                                            <Input
                                                                type="select"
                                                                name="select"
                                                                id="patient"
                                                                value={(this.state.patient)}
                                                                onChange={e => this.onChangePatient(e.target.value)}
                                                            >

                                                                {this.state.allPatients.map((obj) => <option value={obj.patient_id}>{obj.name}</option>)}

                                                            </Input>
                                                        ) : (
                                                                <option>{Config.getProfileData().name}</option>
                                                            )}

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
                                                    </Col>
                                                </FormGroup>
                                                {/* <FormGroup row>
                                    <Label for="vaccine" sm={4}>
                                        Date
                                    </Label>
                                    <Col sm={8}>                                        
                                    <TextField
                                      id="datetime-local"
                                      label="Next appointment"
                                      type="datetime-local"
                                      defaultValue="2017-05-24T10:30"
                                      className={classes.textField}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />                              
                                    </Col>
                              </FormGroup> */}

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
                            classes="table-responsive-lg"
                            filter={filterFactory()}
                            bordered={false}
                            responsive
                            {...props.baseProps}
                        />
                        <ButtonGroup>
                            <Button size="sm" outline onClick={() => { this.getList(this.state.previousPage, null) }} disabled={(this.state.previousPage) ? false : true}>
                                <i className="fa fa-fw fa-chevron-left"></i>
                            </Button>
                            <Button size="sm" outline onClick={() => { this.getList(this.state.nextPage, null) }} disabled={(this.state.nextPage) ? false : true}>
                                <i className="fa fa-fw fa-chevron-right"></i>
                            </Button>
                        </ButtonGroup>
                    </React.Fragment>
                )}
            </ToolkitProvider>
        );
    }
}
