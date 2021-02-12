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
import validator from 'validator';
import {
    // Badge,
    Button,
    // CustomInput,
    // StarRating,
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
    Pagination,
    PaginationItem,
    PaginationLink
} from "../../../../components";
import { CustomExportCSV } from "./CustomExportButton";
import { CustomSearch } from "./CustomSearch";
import { CustomPaginationPanel } from "./CustomPaginationPanel";
import { CustomSizePerPageButton } from "./CustomSizePerPageButton";
import { CustomPaginationTotal } from "./CustomPaginationTotal";
import {
    buildCustomTextFilter
} from "../filters";

import Config from './../../../../config/Config';
import PatientsService from './../../../../services/PatientsService';
import AuthenticationService from './../../../../services/AuthenticationService';
import ProvidersService from "./../../../../services/ProvidersService";
import PractitionersService from "./../../../../services/PractitionersService";

const sortCaret = (order) => {
    if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

export default class ProviderTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            patientsList: [],
            first_name: '',
            last_name: '',
            emailId: '',
            password: '',
            mykad: '',
            first_name_errorMessage: '',
            last_name_errorMessage: '',
            emailId_errorMessage: '',
            password_errorMessage: '',
            authenticationMessage: '',
            hidePassword: true,
            color: "black",
            isLoading: false,
            provider: null,
            practitioner: null,
            allProviders: [],
            allPractitioners: [],
            nextPage: '',
            archiveMessage: "",
            previousPage: ''
        };

        this.headerCheckboxRef = React.createRef();
    }

    getPatient = async (page = null, search = null) => {
        try {
            const paramData = {
                page: page,
                search: search
            }
            const response = await PatientsService.getPatient(paramData);
            console.log('data >>>', response.data);
            if (response.status == true) {
                this.setState({
                    patientsList: response.data.result,
                    nextPage: response.data.next_page,
                    previousPage: response.data.previous_page,
                });
                console.log('patientsList >>>', this.state.patientsList);
                console.log('previous page >>>', this.state.previousPage);
                console.log('next page >>>', this.state.nextPage);
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

    componentDidMount = async () => {
        if (AuthenticationService.getUser()) {
            this.getPatient();
            console.log('profile', Config.profileData);
            if (Config.profileData.role === 100) {
                this.getAllProviders();
            }
            if (Config.profileData.role === 50) {
                this.getAllPractitioners(Config.profileData.id);

            }
        }
        else {
            this.props.history.push({
                pathname: "/login",
            })
        }
    }


    handleMedicalRecordOnClick(cell, row) {
        console.log("Medical Record Button clicked, rowId:", row.patient_id);
        // console.log(this.props);
        this.props.history.push({
            pathname: "/practitioners",
            patient_id: row.patient_id
        });
        // return <Redirect to='/practitioners' />
        // <Link to='/practitioners' />
    }


    async handleArchiveOnClick(cell, row) {
        console.log("Archive button clicked, active flag:", row.active_fl, row.patient_id);
        const data = {
            "patient_id": row.patient_id
        }
        try {
            const response = await PatientsService.archivePatient(data);
            if (response.status == true) {
                console.log(response.data);
                this.setState({
                    archiveMessage: "Patient archived successfully"
                });
                this.getPatient();

            }
            else {
                this.setState({
                   archiveMessage: response.data.data.error
                });
            }
            console.log("archive Patient>>>", this.state.archiveMessage);
        }
        catch (e) {
            console.log(e, e.data)
        }    }

    actionColButton = (cell, row) => {
        return (
            <ButtonGroup>
                <Button
                    size="sm"
                    outline
                    color="indigo"
                    onClick={() => this.handleMedicalRecordOnClick(cell, row)}
                >
                    Medical Record
        </Button>
                <Button
                    size="sm"
                    outline
                    color="danger"
                    onClick={() => this.handleArchiveOnClick(cell, row)}
                >
                    Archive
        </Button>
            </ButtonGroup>
        );
    };

    onChangeFirstName(value) {
        this.setState({
            first_name: value
        })
    }

    onChangeLastName(value) {
        this.setState({
            last_name: value
        })
    }

    onChangeEmail(value) {
        this.setState({
            emailId: value
        });
    }

    onChangePassword(value) {
        this.setState({
            password: value
        })
    }

    secureEntry() {
        this.setState({
            hidePassword: !this.state.hidePassword,
        });
    }

    onChangeMyKad(value) {
        this.setState({
            mykad: value
        })
    }

    onChangeType(value) {
        this.setState({
            type: value
        })
    }

    onChangeProvider(value) {
        console.log('provider_id >>>', value);
        this.getAllPractitioners(value);
        this.setState({
            provider: value
        })
    }
    onChangePractitioner(value) {
        this.setState({
            practitioner: value
        })
    }
    async CreatePatient() {
        this.setState({
            isLoading: true,
            authenticationMessage: '',
        });

        if (this.state.first_name == '') {
            this.setState({
                first_name_errorMessage: "Enter First Name",
                isLoading: false
            });
            return
        }
        else {
            this.setState({
                first_name_errorMessage: "",
            });
        }

        if (this.state.last_name == '') {
            this.setState({
                last_name_errorMessage: "Enter Last Name",
                isLoading: false
            });
            return
        }
        else {
            this.setState({
                last_name_errorMessage: "",
            });
        }

        if (this.state.emailId == '') {
            this.setState({
                emailId_errorMessage: "Enter email ID",
                isLoading: false
            });
            return
        }
        else {
            if (validator.isEmail(this.state.emailId)) {
                this.setState({
                    emailId_errorMessage: ""
                });
            }
            else {
                this.setState({
                    emailId_errorMessage: "Enter a valid email ID",
                    isLoading: false
                })
                return
            }
        }

        if (this.state.password == "") {
            this.setState({
                password_errorMessage: "Enter Password",
                isLoading: false
            });
            return
        } else {
            this.setState({
                password_errorMessage: "",
            });
        }

        if (this.state.mykad == '') {
            this.setState({
                mykad_errorMessage: "Enter MyKad id",
                isLoading: false
            });
            return
        } else {
            if (this.state.mykad.length > 20) {
                this.setState({
                    mykad_errorMessage: "MyKad ID can be maximum of 20 characters",
                    isLoading: false
                });
                return
            } else {
                this.setState({
                    mykad_errorMessage: "",
                })
            }
        }

        const postData = {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email_tx": this.state.emailId,
            "ic_card_tx": this.state.mykad,
            "provider_id": parseInt(this.state.provider),
            "practitioner_id": parseInt(this.state.practitioner),
            "password": this.state.password
        }

        try {
            console.log(postData);
            const response = await PatientsService.createPatient(postData);
            if (response.status == true) {
                console.log(response.data);
                this.setState({
                    color: "success",
                    authenticationMessage: response.data.message,
                    isLoading: false,
                })
                this.getPatient();
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

  createColumnDefinitions() {
    return [
        {
            dataField: "patient_id",
            hidden: true,
            isKey: true,
        },
        {
            dataField: "first_name",
            text: "Patient's First Name",
            sort: true,
            sortCaret,
            formatter: (cell) => <span className="text-inverse">{cell}</span>,
        },
        {
            dataField: "last_name",
            text: "Patient's Last Name",
            sort: true,
            sortCaret,
            formatter: (cell) => <span className="text-inverse">{cell}</span>,
        },
        {
            dataField: "created_dt",
            text: "Date Created",
            formatter: (cell) => moment(cell).format("DD/MM/YYYY"),
            sort: true,
            sortCaret,
        },
        {
            text: "Action",
            formatter: this.actionColButton,
        },
    ];
}
handleCallback = async (childData) =>{
    if (childData.length > 1){            
        this.getPatient(null,childData);
    }
}

    render() {
        const columnDefs = this.createColumnDefinitions();


        return (
            <ToolkitProvider
                keyField="id"
                data={this.state.patientsList}
                columns={columnDefs}
                search
                exportCSV
            >
                {(props) => (
                    <React.Fragment>
                        <div className="d-flex justify-content-end align-items-center mb-2">
                            {/* <h6 className="my-0">
                                    AdvancedTable A
                                </h6> */}
                <div className="d-flex ml-auto">
                    <CustomSearch className="mr-2" {...props.searchProps} parentCallBack={this.handleCallback} />
                    <ButtonGroup>
                    <Button size="sm" outline id="modalDefault301">
                        <i className="fa fa-fw fa-plus"></i>
                    </Button>
                    <UncontrolledModal target="modalDefault301" className="modal-outline-primary">
                        <ModalHeader tag="h5">
                            New Patient
                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                { /* START Input */}
                                                <FormGroup row>
                                                    <Label for="first_name" sm={4}>
                                                        First Name
                                    </Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            type="text"
                                                            name="first_name"
                                                            id="first_name"
                                                            placeholder="First Name"
                                                            value={this.state.first_name}
                                                            onChange={e => this.onChangeFirstName(e.target.value)}
                                                        />
                                                        <FormText color="danger">
                                                            {this.state.first_name_errorMessage}
                                                        </FormText>
                                                    </Col>
                                                </FormGroup>
                                                { /* END Input */}
                                                { /* START Input */}
                                                <FormGroup row>
                                                    <Label for="last_name" sm={4}>
                                                        Last Name
                                    </Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            type="text"
                                                            name="last_name"
                                                            id="last_name"
                                                            placeholder="Last Name"
                                                            value={this.state.last_name}
                                                            onChange={e => this.onChangeLastName(e.target.value)}
                                                        />
                                                        <FormText color="danger">
                                                            {this.state.last_name_errorMessage}
                                                        </FormText>
                                                    </Col>
                                                </FormGroup>
                                                { /* END Input */}
                                                { /* START Input */}
                                                <FormGroup row>
                                                    <Label for="emailId" sm={4}>
                                                        Email ID
                                    </Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            type="email"
                                                            name="emailId"
                                                            id="emailId"
                                                            placeholder="user@example.com"
                                                            value={this.state.emailId}
                                                            onChange={e => this.onChangeEmail(e.target.value)}
                                                        />
                                                        <FormText color="danger">
                                                            {this.state.emailId_errorMessage}
                                                        </FormText>
                                                    </Col>
                                                </FormGroup>
                                                { /* END Input */}
                                                { /* START Input */}
                                                <FormGroup row>
                                                    <Label for="password" sm={4}>
                                                        Password
                                    </Label>
                                                    <Col sm={8}>
                                                        <InputGroup>
                                                            <Input
                                                                type={(this.state.hidePassword) ? ('password') : ('text')}
                                                                name="password"
                                                                id="password"
                                                                placeholder="Password"
                                                                className="bg-white"
                                                                value={this.state.password}
                                                                onChange={e => this.onChangePassword(e.target.value)}
                                                            />
                                                            {(this.state.hidePassword) ?
                                                                <InputGroupAddon addonType="append" onClick={() => this.secureEntry()}>
                                                                    <i className="fa fa-fw fa-eye-slash"></i>
                                                                </InputGroupAddon>
                                                                :
                                                                <InputGroupAddon addonType="append" onClick={() => this.secureEntry()}>
                                                                    <i className="fa fa-fw fa-eye"></i>
                                                                </InputGroupAddon>
                                                            }

                                                        </InputGroup>
                                                        <FormText color="danger">
                                                            {this.state.password_errorMessage}
                                                        </FormText>
                                                    </Col>
                                                </FormGroup>
                                                { /* END Input */}
                                                { /* START Input */}
                                                <FormGroup row>
                                                    <Label for="mykad" sm={4}>
                                                        MyKad id
                                    </Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            type="text"
                                                            name="mykad"
                                                            id="mykad"
                                                            placeholder="MyKad id"
                                                            value={this.state.mykad}
                                                            onChange={e => this.onChangeMyKad(e.target.value)}
                                                        />
                                                        <FormText color="danger">
                                                            {this.state.mykad_errorMessage}
                                                        </FormText>
                                                    </Col>
                                                </FormGroup>
                                                { /* END Input */}
                                                { /* START Select */}
                                                <FormGroup row>
                                                    <Label for="provider" sm={4}>
                                                        Provider
                                    </Label>
                                                    <Col sm={8}>

                                                        {Config.profileData.role === 100 ? (
                                                            <Input
                                                                type="select"
                                                                name="select"
                                                                id="provider"
                                                                value={this.state.provider}
                                                                onChange={e => this.onChangeProvider(e.target.value)}
                                                            >

                                                                {this.state.allProviders.map((obj) => <option value={obj.provider_id}>{obj.name}</option>)}

                                            </Input>
                                        ) : (                                            
                                            <option>{Config.profileData.name}</option>
                                        )}

                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="practitioner" sm={4}>
                                        Practitioner
                                    </Label>
                                                    <Col sm={8}>

                                                        {(Config.profileData.role === 100) || (Config.profileData.role === 50) ? (
                                                            <Input
                                                                type="select"
                                                                name="select"
                                                                id="practitioner"
                                                                value={this.state.practitioner}
                                                                onChange={e => this.onChangePractitioner(e.target.value)}
                                                            >

                                                                {this.state.allPractitioners.map((obj) => <option value={obj.practitioner_id}>{obj.name}</option>)}

                                                            </Input>
                                                        ) : (
                                                                <option>{Config.profileData.name}</option>
                                                            )}

                                                    </Col>
                                                </FormGroup>
                                                { /* END Select */}
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <FormText color={this.state.color}>
                                                {this.state.authenticationMessage}
                                            </FormText>
                                            <UncontrolledModal.Close color="link">
                                                Discard
                            </UncontrolledModal.Close>
                                            <Button color="primary" onClick={() => this.CreatePatient()} disabled={this.state.isLoading}>
                                                Create
                            </Button>
                                        </ModalFooter>
                                    </UncontrolledModal>
                                </ButtonGroup>

                            </div>
                        </div>
                        <BootstrapTable
                            classes="table-responsive-sm"
                            bordered={false}
                            responsive
                            {...props.baseProps}
                        />

                        <ButtonGroup>
                            <Button size="sm" outline onClick={() => { this.getPatient(this.state.previousPage, null) }} disabled={(this.state.previousPage) ? false : true}>
                                <i className="fa fa-fw fa-chevron-left"></i>
                            </Button>
                            <Button size="sm" outline onClick={() => { this.getPatient(this.state.nextPage, null) }} disabled={(this.state.nextPage) ? false : true}>
                                <i className="fa fa-fw fa-chevron-right"></i>
                            </Button>
                        </ButtonGroup>
                    </React.Fragment>
                )}
            </ToolkitProvider>

        );
    }
}
