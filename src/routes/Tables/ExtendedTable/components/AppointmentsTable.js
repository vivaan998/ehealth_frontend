import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  Comparator,
  dateFilter,
} from "react-bootstrap-table2-filter";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import _ from "lodash";
import moment from "moment";

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
import { CustomExportCSV } from "./CustomExportButton";
import { CustomSearch } from "./CustomSearch";
import Config from "./../../../../config/Config";
import AppointmentsService from "../../../../services/AppointmentsService";
import ImmunizationsService from "../../../../services/ImmunizationsService";
import AuthenticationService from "../../../../services/AuthenticationService";
import ProvidersService from "../../../../services/ProvidersService";
import PractitionersService from "../../../../services/PractitionersService";
import PatientsService from "../../../../services/PatientsService";
import VaccinesService from "../../../../services/VaccinesService";
import DateTimePicker from "react-datetime-picker";

const sortCaret = (order) => {
  if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
  if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

export default class AppointmentsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointmentsList: [],
      date: "",
      time: "",
      practitioner: null,
      patient: null,
      provider: null,
      date_errorMessage: "",
      time_errorMessage: "",
      practitioner_errorMessage: "",
      patient_errorMessage: "",
      provider_errorMessage: "",
      authenticationMessage: "",
      color: "black",
      isLoading: false,
      name: "",
      nextPage: "",
      previousPage: "",
      allProviders: [],
      allPractitioners: [],
      allPatients: [],
      searchValue: null,
      archiveMessage: "",
      isArchiving: false,
      datetime: new Date(),
      isGettingData: false,
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
        console.log(
          "provider_id in appointments",
          this.props.location.provider_id
        );
        const response = await AppointmentsService.getPractitionerOfThisProvider(
          this.props.location.provider_id
        );
        if (response.status == true) {
          this.setState({
            appointmentsList: response.data.result,
            nextPage: response.data.next_page,
            previousPage: response.data.previous_page,
            isGettingData: false
          });
        }
      } else if (this.props.location.practitioner_id) {
        console.log(
          "practitioner_id in appointments",
          this.props.location.practitioner_id
        );
        const response = await AppointmentsService.getPractitionerOfThisProvider(
          this.props.location.provider_id
        );
        if (response.status == true) {
          this.setState({
            appointmentsList: response.data.result,
            nextPage: response.data.next_page,
            previousPage: response.data.previous_page,
            isGettingData: false
          });
        }
      } else {
        const response = await AppointmentsService.getList(paramData);
        if (response.status == true) {
          this.setState({
            appointmentsList: response.data.result,
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
        console.log("all Providers List >>>", this.state.allProviders);
        this.getAllPractitioners(this.state.provider);
      }
    } catch (e) {
      console.log("error >>>", e);
      console.log(e, e.data);
    }
  };
  getAllPractitioners = async (value) => {
    try {
      const response = await PractitionersService.getAllPractitionersList(
        value
      );
      if (response.status == true) {
        if (response.data.data.length > 0) {
          this.setState({
            allPractitioners: response.data.data,
            practitioner: response.data.data[0].practitioner_id,
          });
          this.getAllPatients(this.state.practitioner);
        } else {
          this.setState({
            allPractitioners: [],
            allPatients: [],
            practitioner: null,
            patient: null,
          });
        }
        console.log("all practitioner List >>>", this.state.allPractitioners);
      }
    } catch (e) {
      console.log("error >>>", e);
      console.log(e, e.data);
    }
  };
  getAllPatients = async (value) => {
    try {
      const response = await PatientsService.getAllPatientsList(value);
      if (response.status == true) {
        if (response.data.data.length > 0) {
          this.setState({
            allPatients: response.data.data,
            patient: response.data.data[0].patient_id,
          });
        } else {
          this.setState({
            allPatients: [],
            patient: null,
          });
        }
        console.log("all patients List >>>", this.state.allPatients);
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
        console.log("in get all 100 providers");
        this.getAllProviders();
      }
      if (Config.getProfileData().role === 50) {
        console.log("In 50");
        this.getAllPractitioners(Config.getProfileData().id);
      }
      if (Config.getProfileData().role === 10) {
        this.getAllPatients(Config.getProfileData().id);
      }
    } else {
      this.props.history.push({
        pathname: "/login",
      });
    }
  };

  onChangeProvider(value) {
    console.log("provider_id >>>", value);
    this.getAllPractitioners(value);
    this.setState({
      provider: parseInt(value),
    });
  }

  onChangePractitioner(value) {
    console.log("provider_id >>>", value);
    this.getAllPatients(value);
    this.setState({
      practitioner: parseInt(value),
    });
  }

  onChangePatient(value) {
    this.setState({
      patient: parseInt(value),
    });
  }

  onChangeDatetime(value) {
    this.setState({
      datetime: value,
    });
  }

  async createAppointment() {
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
        provider_id: this.state.provider,
        practitioner_id: this.state.practitioner,
        patient_id: this.state.patient,
        appointment_date: formatedDateTime,
      };
      try {
        console.log(postData);
        const response = await AppointmentsService.createAppointment(
          postData
        );
        if (response.status == true) {
          console.log(response.data);
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
  }

  handleArchiveOnClick(cell, row) {
    console.log("Archive button clicked, active flag:", row.active_fl);
  }

  actionColButton = (cell, row) => {
    return (
      <Button
        size="sm"
        outline
        color="danger"
        onClick={() => this.handleArchiveOnClick(cell, row)}
      >
        Cancel
      </Button>
    );
  };

  createColumnDefinitions() {
    return [
      {
        dataField: "appointment_id",
        hidden: true,
        isKey: true,
      },
      {
        dataField: "appointment_date",
        text: "Appointment Date",
        formatter: (cell) => moment(cell).format("DD/MM/YYYY"),
        sort: true,
        sortCaret,
      },
      {
        dataField: "appointment_time",
        text: "Appointment Time",
        sort: true,
        sortCaret,
      },
      {
        dataField: "patient",
        text: "Patient Name",
        sort: true,
        // align: "center",
        sortCaret,
        formatter: (cell) => <span className="text-inverse">{cell}</span>,
      },
      {
        dataField: "practitioner",
        text: "Scheduled By",
        sort: true,
        sortCaret,
        formatter: (cell) => <span className="text-inverse">{cell}</span>,
      },
      {
        dataField: "created_at",
        text: "Scheduled On",
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

  handleCallback = async (childData) => {
    this.getList(null, childData);
  };

  render() {
    const columnDefs = this.createColumnDefinitions();
    return (
      <ToolkitProvider
        keyField="id"
        data={this.state.appointmentsList}
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
                  <Button size="sm" outline id="modalDefault301">
                    <i className="fa fa-fw fa-plus"></i>
                  </Button>
                  <UncontrolledModal
                    target="modalDefault301"
                    className="modal-outline-primary"
                  >
                    <ModalHeader tag="h5">New Appointment</ModalHeader>
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
                                value={this.state.provider}
                                onChange={(e) =>
                                  this.onChangeProvider(e.target.value)
                                }
                              >
                                {this.state.allProviders.map((obj) => (
                                  <option value={obj.provider_id}>
                                    {obj.name}
                                  </option>
                                ))}
                              </Input>
                            ) : (
                              <option>{Config.getProfileData().name}</option>
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
                            {Config.getProfileData().role === 100 ||
                            Config.getProfileData().role === 50 ? (
                              <Input
                                type="select"
                                name="select"
                                id="practitioner"
                                value={this.state.practitioner}
                                onChange={(e) =>
                                  this.onChangePractitioner(e.target.value)
                                }
                              >
                                {this.state.allPractitioners.map((obj) => (
                                  <option value={obj.practitioner_id}>
                                    {obj.name}
                                  </option>
                                ))}
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
                          <Label for="patient" sm={4}>
                            Patient Name
                          </Label>
                          <Col sm={8}>
                            {Config.getProfileData().role === 100 ||
                            Config.getProfileData().role === 50 ||
                            Config.getProfileData().role === 10 ? (
                              <Input
                                type="select"
                                name="select"
                                id="patient"
                                value={this.state.patient}
                                onChange={(e) =>
                                  this.onChangePatient(e.target.value)
                                }
                              >
                                {this.state.allPatients.map((obj) => (
                                  <option value={obj.patient_id}>
                                    {obj.name}
                                  </option>
                                ))}
                              </Input>
                            ) : (
                              <option>{Config.getProfileData().name}</option>
                            )}
                            <FormText color="danger">
                              {this.state.patient_errorMessage}
                            </FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="datetime" sm={4}>
                            Date and Time
                          </Label>
                          <Col sm={8}>
                            <DateTimePicker
                              value={this.state.datetime}
                              onChange={(value) => this.onChangeDatetime(value)}
                              minDate={moment().toDate()}
                            />
                            <FormText color="danger">
                              {this.state.date_errorMessage}
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
                      <Button
                        color="primary"
                        onClick={() => this.createAppointment()}
                        disabled={this.state.isLoading}
                      >
                        {this.state.isLoading
                          ? "Creating Appointment..."
                          : "Create Appointment"}
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
              noDataIndication={this.state.isGettingData ? 'Getting appointments...' : 'No appointments found!'}
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
