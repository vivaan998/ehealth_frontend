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

import ProvidersService from './../../../../services/ProvidersService';
import AuthenticationService from './../../../../services/AuthenticationService';


const sortCaret = (order) => {
    if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

export default class ProviderTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            providersList: [],
            name: '',
            emailId: '',
            password: '',
            name_errorMessage: '',
            email: '',
            password: '',
            emailId_errorMessage: '',
            password_errorMessage: '',
            authenticationMessage: '',
            hidePassword: true,
            color: "black",
            isLoading: false,
            name: '',
            nextPage: '',
            previousPage: ''
        };

        this.headerCheckboxRef = React.createRef();
    }

    getList = async (page=null, search=null) => {
        try{
            const paramData = {
                page: page,
                search: search
            }
            const response = await ProvidersService.getList(paramData);
            console.log('data >>>', response.data);
            if (response.status == true){
                this.setState({
                    providersList: response.data.result,
                    nextPage: response.data.next_page,
                    previousPage: response.data.previous_page,            
                });
                console.log('providersList >>>', this.state.providersList);
                console.log('previous page >>>', this.state.previousPage);
                console.log('next page >>>', this.state.nextPage);
            }
            
        }
        catch(e){
            console.log('error >>>', e);
            console.log(e, e.data);
        }
    }

    componentDidMount = async () => { 
        if (AuthenticationService.getUser()){
            this.getList();           
        }
        else{
            this.props.history.push({
                pathname: "/login",
            })
        }
    }   


    handlePractitionersOnClick(cell, row) {
        console.log("Practitioners Button clicked, rowId:", row.provider_id);
        // console.log(this.props);
        this.props.history.push("/practitioners");
        // return <Redirect to='/practitioners' />
        // <Link to='/practitioners' />
    }

    handleAppointmentsOnClick(cell, row) {
        console.log("Appointments button clicked, rowId:", row.provider_id);
    }

    handleArchiveOnClick(cell, row) {
        console.log("Archive button clicked, active flag:", row.active_fl);
    }

    actionColButton = (cell, row) => {
        return (
            <ButtonGroup>
                <Button
                    size="sm"
                    outline
                    color="primary"
                    onClick={() => this.handlePractitionersOnClick(cell, row)}
                >
                    Practitioners
        </Button>
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
                    color="danger"
                    onClick={() => this.handleArchiveOnClick(cell, row)}
                >
                    Archive
        </Button>
            </ButtonGroup>
        );
    };

  secureEntry(){
    this.setState({
        hidePassword: !this.state.hidePassword,
    });
  }

  onChangeName(value){
    this.setState({
      name: value
    })
  }

  onChangeEmail(value){
    this.setState({
        emailId: value
    });
  }

  onChangePassword(value){
      this.setState({
          password: value
      })
  }

  async CreateProvider() {
      this.setState({
          isLoading: true,
          authenticationMessage: '',
      })
      if (this.state.name == ''){
        this.setState({
            name_errorMessage: "Enter Name",
            isLoading: false
        });
        return
      }
      else{          
        this.setState({
            name_errorMessage: ""
        });             
      }

      if (this.state.emailId == ''){
          this.setState({
              emailId_errorMessage: "Enter email ID",
              isLoading: false
          });
          return
      }
      else{
          if (validator.isEmail(this.state.emailId)){
              this.setState({
                  emailId_errorMessage: ""
              });
          }
          else{
              this.setState({
                  emailId_errorMessage: "Enter a valid email ID",
                  isLoading: false
              })
              return 
          }
          
      }
      if (this.state.password == ''){
          this.setState({
              password_errorMessage: "Enter password",
              isLoading: false
          });
          return
      }
      else{
          this.setState({
              password_errorMessage: ""
          });
          const postData = {
              name: this.state.name,
              email: this.state.emailId,
              password: this.state.password
          }
          try{
              console.log('postData >>>', postData);
              const response = await ProvidersService.createProvider(postData);
              if (response.status == true) {
                  console.log(response.data);
                  this.setState({
                      color: "success",
                      authenticationMessage: "Successfully created provider",
                      isLoading: false,
                  });
                  
                  // this.props.history.replace({
                  //     pathname: "/providers",
                  //     state: {
                  //         id: 7,
                  //         color: 'green'
                  //     }
                  // })  
                  
                  
              }
              else{
                  this.setState({
                      color: "danger",
                      isLoading: false,
                      authenticationMessage: response.data.data.error
                  });
              }
          }
          catch (e){
              console.log(e, e.data)      
          }
      }

  }

  createColumnDefinitions() {
    return [
        {
            dataField: "provider_id",
            hidden: true,
            isKey: true,
        },
        {
            dataField: "name_tx",
            text: "Provider Name",
            sort: true,
            // align: "center",
            sortCaret,
            formatter: (cell) => <span className="text-inverse">{cell}</span>,
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
            // sort: true,
            // align: "center",
            // sortCaret,
            formatter: this.actionColButton,
        },
    ];
}


  render() {
    const columnDefs = this.createColumnDefinitions();
    
    
    return (
        <ToolkitProvider
            keyField="id"
            data={this.state.providersList}
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
                    <CustomSearch className="mr-2" {...props.searchProps} />
                    <ButtonGroup>
                    <Button size="sm" outline id="modalDefault301">
                        <i className="fa fa-fw fa-plus"></i>
                    </Button>
                    <UncontrolledModal target="modalDefault301" className="modal-outline-primary">
                        <ModalHeader tag="h5">
                            New Provider                        
                        </ModalHeader>
                        <ModalBody>
                        <Form>
                            { /* START Input */}
                            <FormGroup row>
                                <Label for="name" sm={4}>
                                    Provider Name
                                </Label>
                                <Col sm={8}>
                                    <Input 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        placeholder="Full Name"
                                        value={this.state.name}
                                        onChange={e => this.onChangeName(e.target.value)}
                                    />
                                    <FormText color="danger">
                                    {this.state.name_errorMessage}
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
                            { /* START Radios */}
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
                            { /* END Radios */}
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                            <FormText color={this.state.color}>
                            {this.state.authenticationMessage}
                            </FormText>
                            <UncontrolledModal.Close color="link">
                                Discard
                            </UncontrolledModal.Close>
                            <Button color="primary" onClick={() => this.CreateProvider()} disabled={this.state.isLoading}>
                            Create
                            </Button>
                        </ModalFooter>
                    </UncontrolledModal>
                    </ButtonGroup>
                    
                </div>
                </div>
                <BootstrapTable
                classes="table-responsive-lg"
                bordered={false}
                responsive
                {...props.baseProps}
                />

                <ButtonGroup>
                    <Button size="sm" outline onClick = {() => {this.getList(this.state.previousPage, null)}} disabled={(this.state.previousPage) ? false : true}>
                        <i className="fa fa-fw fa-chevron-left"></i>
                    </Button>
                    <Button size="sm" outline onClick = {() => {this.getList(this.state.nextPage, null)}} disabled={(this.state.nextPage) ? false : true}>
                        <i className="fa fa-fw fa-chevron-right"></i>
                    </Button>
                </ButtonGroup>
            </React.Fragment>
            )}
        </ToolkitProvider>
        
    );
  }
}
