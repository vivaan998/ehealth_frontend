import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  Comparator,
  dateFilter,
} from "react-bootstrap-table2-filter";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import _ from "lodash";
import faker from "faker/locale/en_US";
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

import VaccinesService from './../../../../services/VaccinesService';
import AuthenticationService from './../../../../services/AuthenticationService';


const INITIAL_PRODUCTS_COUNT = 500;

const sortCaret = (order) => {
  if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
  if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

export default class VaccinesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vaccinesList: [],
      name: '',
      dose: 1,
      description: '',
      name_errorMessage: '',
      description_errorMessage: '',
      authenticationMessage: '',
      color: "black",
      isLoading: false,
      nextPage: '',
      previousPage: ''
    };

    this.headerCheckboxRef = React.createRef();
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

  getList = async (page=null, search=null) => {
    try{
        const paramData = {
            page: page,
            search: search
        }
        const response = await VaccinesService.getVaccines(paramData);
        if (response.status == true){
            this.setState({
                vaccinesList: response.data.result,
                nextPage: response.data.next_page,
                previousPage: response.data.previous_page,                      
            });
        }
    }
    catch(e){
        console.log('error >>>', e);
        console.log(e, e.data);
    }
  }

  handleAdministered(cell, row){
    console.log("vaccine handle",row.vaccine_id);
    this.props.history.push({
      pathname: '/immunizations',
      vaccine_id: row.vaccine_id
    });
  }

  handleArchive(cell, row){
    console.log(row.id);
  }
  
  actionButton = (cell, row,) => {
    return(
      <ButtonGroup>
        <Button size="sm" outline color="indigo" onClick={() => this.handleAdministered(cell, row)}>
                  Administered to
        </Button>
        <Button size="sm" color="danger" outline onClick={() => this.handleArchive(cell, row)}>
                  Archive
        </Button>
      </ButtonGroup>


      
    )
  }

  createColumnDefinitions() {
    
    return [
      {
        dataField: "vaccine_id",
        hidden: true,
        isKey: true
      },
      {
        dataField: "name_tx",
        text: "Vaccine Name",
        sort: true,
        // align: "center",
        sortCaret,
        formatter: (cell) => <span className="text-inverse">{cell}</span>,
      },{
        dataField: "doses_required",
        text: "Dose Required",
        sort: true,
        // align: "center",
        sortCaret,
        formatter: (cell) => <span className="text-inverse">{cell}</span>,
        // ...buildCustomTextFilter({
        //   placeholder: "Enter Vaccine name...",
        //   getFilter: (filter) => {
        //     this.nameFilter = filter;
        //   },
        // }),
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
        
        // events: {
        //   onClick: (e, column, row, rowIndex) => {console.log(rowIndex)}
        // },
        
        formatter: this.actionButton
      },
    ];
  }

  onChangeName(value){
    this.setState({
      name: value
    })
  }

  onChangeDose(value){
    this.setState({
        dose: parseInt(value)
    });
  }

  onChangeDescription(value){
      this.setState({
          description: value
      })
  }

  async addVaccine() {
    this.setState(({
        isLoading: true,
        authenticationMessage: '',
    }))
    if (this.state.name == ''){
      this.setState({
          name_errorMessage: "Enter vaccine name",
          isLoading: false
      });
      return
    }
    else{          
      this.setState({
          name_errorMessage: ""
      });             
    }

    
    if (this.state.description == ''){
        this.setState({
            description_errorMessage: "Enter vaccine description",
            isLoading: false
        });
        return
    }
    else{
        this.setState({
            description_errorMessage: ""
        });
        const postData = {
            name_tx: this.state.name,
            doses_required: this.state.dose,
            description_tx: this.state.description
        }
        try{
            console.log('postData >>>', postData);
            const response = await VaccinesService.createVaccine(postData);
            if (response.status == true) {
                console.log(response.data);
                this.setState({
                    color: "success",
                    authenticationMessage: "Successfully created vaccine",
                    isLoading: false,
                });
                this.getList();               
                
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
  handleCallback = async (childData) =>{
    if (childData.length > 1){            
        this.getList(null,childData);
    }
  }

  render() {
    const columnDefs = this.createColumnDefinitions();
    
    return (
      <ToolkitProvider
        keyField="id"
        data={this.state.vaccinesList}
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
                        New Vaccine                        
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        { /* START Input */}
                        <FormGroup row>
                            <Label for="name" sm={4}>
                                Vaccine Name
                            </Label>
                            <Col sm={8}>
                                <Input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    placeholder="Vaccine name"
                                    value={this.state.name}
                                    onChange={e => this.onChangeName(e.target.value)}
                                />
                                <FormText color="danger">
                                  {this.state.name_errorMessage}
                                </FormText>
                            </Col>
                        </FormGroup>
                        { /* END Input */}
                        { /* START Radios */}
                        <FormGroup row>
                            <Label for="doses_required" sm={4} className="pt-0">
                                Doses Required
                            </Label>
                            <Col sm={8}>
                                <CustomInput 
                                    type="radio" 
                                    id="doses_required1"
                                    name="doses_required"
                                    label="1"
                                    inline
                                    defaultChecked
                                    value={1}
                                    // checked={this.state.dose === 1}
                                    onChange={e => this.onChangeDose(e.target.value)}
                                />
                                <CustomInput 
                                    type="radio" 
                                    id="doses_required2"
                                    name="doses_required"
                                    label="2" 
                                    inline
                                    value={2}
                                    // checked={this.state.dose === 2}
                                    onChange={e => this.onChangeDose(e.target.value)}
                                />
                                <CustomInput 
                                    type="radio" 
                                    id="doses_required3"
                                    name="doses_required"
                                    label="3" 
                                    inline
                                    value={3}
                                    // checked={this.state.dose === 2}
                                    onChange={e => this.onChangeDose(e.target.value)}
                                />
                                <CustomInput 
                                    type="radio" 
                                    id="doses_required4"
                                    name="doses_required"
                                    label="4" 
                                    inline
                                    value={4}
                                    // checked={this.state.dose === 2}
                                    onChange={e => this.onChangeDose(e.target.value)}
                                />
                                <CustomInput 
                                    type="radio" 
                                    id="doses_required5"
                                    name="doses_required"
                                    label="5" 
                                    inline
                                    value={5}
                                    // checked={this.state.dose === 2}
                                    onChange={e => this.onChangeDose(e.target.value)}
                                />
                                
                            </Col>
                        </FormGroup>
                        { /* END Radios */}
                        <FormGroup row>
                            <Label for="message-1" sm={4}>
                                Description
                            </Label>
                            <Col sm={8}>
                                <Input 
                                    type="textarea" 
                                    name="text" 
                                    maxLength="500"
                                    id="message-1" 
                                    placeholder="Vaccine description..." 
                                    className="mb-2"
                                    value={this.state.description}
                                    onChange={e => this.onChangeDescription(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <FormText color={this.state.color}>
                          {this.state.authenticationMessage}
                        </FormText>
                        <UncontrolledModal.Close color="link">
                          Close
                        </UncontrolledModal.Close>
                        <Button color="primary" onClick={() => this.addVaccine()} disabled={this.state.isLoading}>
                          Add Vaccine
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
