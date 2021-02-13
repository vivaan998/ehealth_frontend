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

const sortCaret = (order) => {
    if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

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
        }
    }

    getVital = async (page = null, search = null) => {
        try {
            console.log("immunizationsss", this.state.patient_detail.patient_id);
            const paramData = {
                page: page,
                search: search,
                patient_id: this.state.patient_detail.patient_id
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
            console.log("immunizationsss", this.state.patient_detail.patient_id);
            const paramData = {
                page: page,
                search: search
            }
            const response = await MedicalReportService.getImmunizations(paramData, this.state.patient_detail.patient_id);
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
            console.log("appointmentsss", this.state.patient_detail.patient_id);
            const paramData = {
                page: page,
                search: search
            }
            const response = await MedicalReportService.getAppointments(paramData, this.state.patient_detail.patient_id);
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
            },{
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
                                        <CustomSearch className="mr-2" {...props.searchProps} parentCallBack={this.handleCallback} />
                                        <ButtonGroup>
                                            <Button
                                                size="sm"
                                                outline
                                            // onClick={this.handleAddRow.bind(this)}
                                            >
                                                <i className="fa fa-fw fa-plus"></i>
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
                                        <CustomSearch className="mr-2" {...props.searchProps} parentCallBack={this.handleCallback} />
                                        <ButtonGroup>
                                            <Button
                                                size="sm"
                                                outline
                                            // onClick={this.handleAddRow.bind(this)}
                                            >
                                                <i className="fa fa-fw fa-plus"></i>
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
                                        <CustomSearch className="mr-2" {...props.searchProps} parentCallBack={this.handleCallback} />
                                        <ButtonGroup>
                                            <Button
                                                size="sm"
                                                outline
                                            // onClick={this.handleAddRow.bind(this)}
                                            >
                                                <i className="fa fa-fw fa-plus"></i>
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