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
import axios from "axios";
import paths from "./../../../../config/Endpoint";
import AuthenticationService from "./../../../../services/AuthenticationService";
import Config from "./../../../../config/Config";

import {
    Badge,
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
    Form,
    FormGroup,
} from "../../../../components";
import { CustomExportCSV } from "./CustomExportButton";
import { CustomSearch } from "./CustomSearch";
import { CustomPaginationPanel } from "./CustomPaginationPanel";
import { CustomSizePerPageButton } from "./CustomSizePerPageButton";
import { CustomPaginationTotal } from "./CustomPaginationTotal";
import { buildCustomTextFilter } from "../filters";

import PractitionersService from "./../../../../services/PractitionersService";
import validator from "validator";
import MenuListingService from "./../../../../services/MenuListingService";
import ProvidersService from "../../../../services/ProvidersService";

const sortCaret = (order) => {
    if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

export default class PractitionersTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            practitionersList: [],
            firstname: "",
            name_errorMessage: "",
            lastname_errorMessage: "",
            lastname: "",
            emailId: "",
            emailId_errorMessage: "",
            hidePassword: true,
            password: "",
            password_errorMessage: "",
            color: "black",
            isLoading: false,
            mykad_errorMessage: "",
            mykad: "",
            type: 1,
            firstname_errorMessage: "",
            authenticationMessage: "",
            allProviders: [],
            provider: null,
            provide_id: null,
            previousPage: "",
            nextPage: "",
            archiveMessage: "",
            isArchiving: false,
            isGettingData: false
        };
        this.headerCheckboxRef = React.createRef();
    }

    getList = async (page = null, search = null) => {
        try {
            this.setState({
                isGettingData: true
            });
            const paramData = {
                page: page,
                search: search,
            };

            if (this.props.location.provider_id) {
                const response = await PractitionersService.getPractitionerOfThisProvider(
                    paramData,
                    this.props.location.provider_id
                );
                if (response.status == true) {
                    this.setState({
                        practitionersList: response.data.result,
                        nextPage: response.data.next_page,
                        previousPage: response.data.previous_page,
                        isGettingData: false
                    });
                }
            } else {
                const response = await PractitionersService.getList(paramData);
                if (response.status == true) {
                    this.setState({
                        practitionersList: response.data.result,
                        nextPage: response.data.next_page,
                        previousPage: response.data.previous_page,
                        isGettingData: false
                    });
                }
            }
        } catch (e) {
            console.log("error >>>", e);
            console.log(e, e.data);
        }
    };

    getAllProviders = async () => {
        try {
            const response = await ProvidersService.getAllProvidersList();
            if (response.status == true) {
                this.setState({
                    allProviders: response.data.data,
                    provider: response.data.data[0].provider_id,
                });
            }
        } catch (e) {
            console.log("error >>>", e);
            console.log(e, e.data);
        }
    };

    componentDidMount = async () => {
        if (AuthenticationService.getUser()) {
            this.getList();
            if (Config.getProfileData().role === 100) {
                this.getAllProviders();
            }
        } else {
            this.props.history.push({
                pathname: "/login",
            });
        }
    };

    // handleAddRow() {
    //   const currentSize = this.state.products.length;

    //   this.setState({
    //     products: [generateRow(currentSize + 1), ...this.state.products],
    //   });
    // }


    handleImmunizationssOnClick(cell, row) {
        this.props.history.push({
            pathname: "/immunizations",
            practitioner_id: row.practitioner_id,
        });
    }

    handleAppointmentsOnClick(cell, row) {
        this.props.history.push({
            pathname: "/appointments",
            practitioner_id: row.practitioner_id,
        });
    }

    handleArchiveOnClick = async (cell, row) => {
       
        const data = {
            practitioner_id: row.practitioner_id,
        };
        this.setState({
            isArchiving: true,
        });
        try {
            const response = await PractitionersService.archivePractitioner(data);
            if (response.status == true) {
                this.setState({
                    archiveMessage: "Practitioner archived successfully",
                    isArchiving: false,
                });
                this.getList();
            } else {
                this.setState({
                    archiveMessage: response.data.data.error,
                    isArchiving: false,
                });
            }
        } catch (e) {
            console.log(e, e.data);
        }
    };

    actionColButton = (cell, row) => {
        return (
            <ButtonGroup>
                <Button
                    size="sm"
                    outline
                    color="purple"
                    onClick={() => this.handleAppointmentsOnClick(cell, row)}
                >
                    Appointments
        </Button>
                <Button
                    size="sm"
                    outline
                    color="primary"
                    onClick={() => this.handleImmunizationssOnClick(cell, row)}
                >
                    Immunizations
        </Button>
                <Button
                    size="sm"
                    outline
                    color="danger"
                    onClick={() => this.handleArchiveOnClick(cell, row)}
                    disabled={this.state.isArchiving}
                >
                    Archive
        </Button>
            </ButtonGroup>
        );
    };

    createColumnDefinitions() {
        return [
            {
                dataField: "practitioner_id",
                hidden: true,
                isKey: true,
            },
            {
                dataField: "first_name",
                text: "First Name",
                sort: true,
                sortCaret,
                formatter: (cell) => <span className="text-inverse">{cell}</span>,
            },
            {
                dataField: "last_name",
                text: "Last Name",
                sort: true,
                sortCaret,
                formatter: (cell) => <span className="text-inverse">{cell}</span>,
            },
            {
                dataField: "doctor_fl",
                text: "Doctor/Nurse",
                sort: true,
                sortCaret,
                formatter: (cell) => (
                    <span className="text-inverse">
                        {cell ? (
                            <Badge color="indigo">Doctor</Badge>
                        ) : (
                                <Badge color="primary">Nurse</Badge>
                            )}
                    </span>
                ),
            },
            {
                dataField: "created_dt",
                text: "Date Added",
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

    onChangeFirstName(value) {
        this.setState({
            firstname: value,
        });
    }

    onChangeLastName(value) {
        this.setState({
            lastname: value,
        });
    }

    onChangeEmail(value) {
        this.setState({
            emailId: value,
        });
    }

    onChangePassword(value) {
        this.setState({
            password: value,
        });
    }

    secureEntry() {
        this.setState({
            hidePassword: !this.state.hidePassword,
        });
    }

    onChangeMyKad(value) {
        this.setState({
            mykad: value,
        });
    }

    onChangeType(value) {
        this.setState({
            type: value,
        });
    }

    onChangeProvider(value) {
        this.setState({
            provider: value,
        });
    }

    async CreatePractitioner() {
        this.setState({
            isLoading: true,
            authenticationMessage: "",
        });

        if (this.state.firstname == "") {
            this.setState({
                firstname_errorMessage: "Enter First Name",
                isLoading: false,
            });
            return;
        } else {
            this.setState({
                firstname_errorMessage: "",
            });
        }

        if (this.state.lastname == "") {
            this.setState({
                lastname_errorMessage: "Enter Last Name",
                isLoading: false,
            });
            return;
        } else {
            this.setState({
                lastname_errorMessage: "",
            });
        }

        if (this.state.emailId == "") {
            this.setState({
                emailId_errorMessage: "Enter email ID",
                isLoading: false,
            });
            return;
        } else {
            if (validator.isEmail(this.state.emailId)) {
                this.setState({
                    emailId_errorMessage: "",
                });
            } else {
                this.setState({
                    emailId_errorMessage: "Enter a valid email ID",
                    isLoading: false,
                });
                return;
            }
        }

        if (this.state.password == "") {
            this.setState({
                password_errorMessage: "Enter Password",
                isLoading: false,
            });
            return;
        } else {
            this.setState({
                password_errorMessage: "",
            });
        }

        if (this.state.mykad == "") {
            this.setState({
                mykad_errorMessage: "Enter MyKad id",
                isLoading: false,
            });
            return;
        } else {
            if (this.state.mykad.length > 20) {
                this.setState({
                    mykad_errorMessage: "length of MyKad id should be 20",
                    isLoading: false,
                });
                return;
            } else {
                this.setState({
                    mykad_errorMessage: "",
                });
            }
        }

        const postData = {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email_tx: this.state.emailId,
            ic_card_tx: this.state.mykad,
            provider_id: Number(this.state.provider),
            doctor_fl: this.state.type,
            password: this.state.password,
        };

        try {
            const response = await PractitionersService.createPractitioner(postData);
            if (response.status == true) {
                this.setState({
                    color: "success",
                    authenticationMessage: response.data.message,
                    isLoading: false,
                });
                this.getList();
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
    handleCallback = async (childData) => {
        this.getList(null, childData);
    };

    render() {
        const columnDefs = this.createColumnDefinitions();

        return (
            
            <ToolkitProvider
                keyField="id"
                data={this.state.practitionersList}
                columns={columnDefs}
            >
                
                {(props) => (
                    <React.Fragment>
                        <div className="d-flex justify-content-end align-items-center mb-2">
                            <div className="d-flex ml-auto">
                                
                                <CustomSearch
                                    className="mr-2"
                                    {...props.searchProps}
                                    parentCallBack={this.handleCallback}
                                />
                                <ButtonGroup>
                                    <Button
                                        size="sm"
                                        outline
                                        id="modalDefault301"
                                    >
                                        <i className="fa fa-fw fa-plus"></i>
                                    </Button>
                                    <UncontrolledModal
                                        target="modalDefault301"
                                        className="modal-outline-primary"
                                    >
                                        <ModalHeader tag="h5">New Practitioner</ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                {/* START Input */}
                                                <FormGroup row>
                                                    <Label for="firstname" sm={4}>
                                                        First Name
                          </Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            type="text"
                                                            name="firstname"
                                                            id="firstname"
                                                            placeholder="First Name"
                                                            value={this.state.firstname}
                                                            onChange={(e) =>
                                                                this.onChangeFirstName(e.target.value)
                                                            }
                                                        />
                                                        <FormText color="danger">
                                                            {this.state.firstname_errorMessage}
                                                        </FormText>
                                                    </Col>
                                                </FormGroup>
                                                {/* END Input */}
                                                {/* START Input */}
                                                <FormGroup row>
                                                    <Label for="lastname" sm={4}>
                                                        Last Name
                                                    </Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            type="text"
                                                            name="firstname"
                                                            id="lastname"
                                                            placeholder="Last Name"
                                                            value={this.state.lastname}
                                                            onChange={(e) =>
                                                                this.onChangeLastName(e.target.value)
                                                            }
                                                        />
                                                        <FormText color="danger">
                                                            {this.state.lastname_errorMessage}
                                                        </FormText>
                                                    </Col>
                                                </FormGroup>
                                                {/* END Input */}
                                                {/* START Input */}
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
                                                            onChange={(e) =>
                                                                this.onChangeEmail(e.target.value)
                                                            }
                                                        />
                                                        <FormText color="danger">
                                                            {this.state.emailId_errorMessage}
                                                        </FormText>
                                                    </Col>
                                                </FormGroup>
                                                {/* END Input */}
                                                {/* START Input */}
                                                <FormGroup row>
                                                    <Label for="password" sm={4}>
                                                        Password
                          </Label>
                                                    <Col sm={8}>
                                                        <InputGroup>
                                                            <Input
                                                                type={
                                                                    this.state.hidePassword ? "password" : "text"
                                                                }
                                                                name="password"
                                                                id="password"
                                                                placeholder="Password"
                                                                className="bg-white"
                                                                value={this.state.password}
                                                                onChange={(e) =>
                                                                    this.onChangePassword(e.target.value)
                                                                }
                                                            />
                                                            {this.state.hidePassword ? (
                                                                <InputGroupAddon
                                                                    addonType="append"
                                                                    onClick={() => this.secureEntry()}
                                                                >
                                                                    <i className="fa fa-fw fa-eye-slash"></i>
                                                                </InputGroupAddon>
                                                            ) : (
                                                                    <InputGroupAddon
                                                                        addonType="append"
                                                                        onClick={() => this.secureEntry()}
                                                                    >
                                                                        <i className="fa fa-fw fa-eye"></i>
                                                                    </InputGroupAddon>
                                                                )}
                                                        </InputGroup>
                                                        <FormText color="danger">
                                                            {this.state.password_errorMessage}
                                                        </FormText>
                                                    </Col>
                                                </FormGroup>
                                                {/* END Input */}
                                                {/* START Input */}
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
                                                            onChange={(e) =>
                                                                this.onChangeMyKad(e.target.value)
                                                            }
                                                        />
                                                        <FormText color="danger">
                                                            {this.state.mykad_errorMessage}
                                                        </FormText>
                                                    </Col>
                                                </FormGroup>
                                                {/* END Input */}
                                                {/* START Select */}
                                                <FormGroup row>
                                                    <Label for="type" sm={4}>
                                                        Type
                          </Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            type="select"
                                                            name="select"
                                                            id="type"
                                                            onChange={(e) =>
                                                                this.onChangeType(e.target.value)
                                                            }
                                                        >
                                                            <option value={1}>Doctor</option>
                                                            <option value={0}>Nurse</option>
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                                {/* END Select */}

                                                {/* START Select */}
                                                <FormGroup row>
                                                    <Label for="provider" sm={4}>
                                                        Provider
                          </Label>
                                                    <Col sm={8}>
                                                        {Config.getProfileData().role === 100 ? (
                                                            <Input
                                                                type="select"
                                                                name="select"
                                                                id="provider"
                                                                onChange={(e) =>
                                                                    this.onChangeProvider(e.target.value)
                                                                }
                                                            >
                                                                {this.state.allProviders.map((obj) => (
                                                                    <option value={obj.provider_id}>
                                                                        {obj.name}
                                                                    </option>
                                                                ))}

                                                                {/* <option defaultValue="">SSG Hospital</option>
                                                                <option>KD Hospital</option> */}
                                                            </Input>
                                                        ) : (
                                                                <option>{Config.getProfileData().name}</option>
                                                            )}
                                                    </Col>
                                                </FormGroup>
                                                {/* END Select */}
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <FormText color={this.state.color}>
                                                {this.state.authenticationMessage}
                                            </FormText>
                                            <UncontrolledModal.Close color="link">
                                                Discard
                      </UncontrolledModal.Close>
                                            <Button
                                                color="primary"
                                                onClick={() => this.CreatePractitioner()}
                                                disabled={this.state.isLoading}
                                            >
                                                {this.state.isLoading
                                                    ? "Creating practitioner..."
                                                    : "Create Practitioner"}
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
                            noDataIndication={this.state.isGettingData ? 'Getting practitioners...' : 'No practitioners found!'}
                            {...props.baseProps}
                        />

                        <ButtonGroup>
                            <Button
                                size="sm"
                                outline
                                onClick={() => {
                                    this.getList(this.state.previousPage, null);
                                }}
                                disabled={this.state.previousPage ? false : true}
                            >
                                <i className="fa fa-fw fa-chevron-left"></i>
                            </Button>
                            <Button
                                size="sm"
                                outline
                                onClick={() => {
                                    this.getList(this.state.nextPage, null);
                                }}
                                disabled={this.state.nextPage ? false : true}
                            >
                                <i className="fa fa-fw fa-chevron-right"></i>
                            </Button>
                        </ButtonGroup>
                    </React.Fragment>
                )}
            </ToolkitProvider>
        );
    }
}
