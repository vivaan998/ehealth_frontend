import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { Comparator, dateFilter } from 'react-bootstrap-table2-filter'
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import _ from 'lodash';
import moment from 'moment';

import {
    Button,
    ButtonGroup
} from '../../../../components';
import { CustomExportCSV } from './CustomExportButton';
import { CustomSearch } from './CustomSearch';


import AppointmentsService from './../../../../services/AppointmentsService';
import AuthenticationService from './../../../../services/AuthenticationService';

const sortCaret = (order) => {
    if (!order)
        return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order)
        return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>
}


export default class AppointmentsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            appointmentsList: [],
        };

        this.headerCheckboxRef = React.createRef();
    }

    getList = async (page=null, search=null) => {
        try{
            const paramData = {
                page: page,
                search: search
            }
            
            if (this.props.location.provider_id){
                console.log("provider_id in appointments",this.props.location.provider_id);
                const response = await AppointmentsService.getPractitionerOfThisProvider(this.props.location.provider_id);
                if (response.status == true){
                    this.setState({
                        appointmentsList: response.data.result,
                        nextPage: response.data.next_page,
                        previousPage: response.data.previous_page,
                    });
                }
            }else if (this.props.location.practitioner_id){
                console.log("practitioner_id in appointments",this.props.location.practitioner_id);
                const response = await AppointmentsService.getPractitionerOfThisProvider(this.props.location.provider_id);
                if (response.status == true){
                    this.setState({
                        appointmentsList: response.data.result,
                        nextPage: response.data.next_page,
                        previousPage: response.data.previous_page,
                    });
                }
            }else{
                const response = await AppointmentsService.getList(paramData);
                if (response.status == true){
                    this.setState({
                        appointmentsList: response.data.result,
                        nextPage: response.data.next_page,
                        previousPage: response.data.previous_page,
                    });
                }
            }
            
        }
        catch (e) {
            console.log('error >>>', e);
            console.log(e, e.data);
        }
    }


    componentDidMount = async () => { 
        if (AuthenticationService.getUser()){
            this.getList();           
        }
        else {
            this.props.history.push({
                pathname: "/login",
            })
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
            }, {
                dataField: 'patient',
                text: 'Patient Name',
                sort: true,
                // align: "center",
                sortCaret,
                formatter: (cell) => (
                    <span className="text-inverse">
                        { cell}
                    </span>
                ),
            }, {
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
                dataField: 'created_at',
                text: 'Scheduled On',
                formatter: (cell) =>
                    moment(cell).format('DD/MM/YYYY'),
                sort: true,
                sortCaret
            }, {
                text: 'Action',
                formatter: this.actionColButton
            }
        ];
    }

    handleCallback = async (childData) =>{     
        this.getList(null,childData);
    }

    render() {
        const columnDefs = this.createColumnDefinitions();
        return (
            <ToolkitProvider
                keyField="id"
                data={this.state.appointmentsList}
                columns={columnDefs}
            >
                {
                    props => (
                        <React.Fragment>
                            <div className="d-flex justify-content-end align-items-center mb-2">
                                <div className="d-flex ml-auto">
                                    <CustomSearch className="mr-2" {...props.searchProps} parentCallBack = {this.handleCallback}   />
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
                                <Button size="sm" outline onClick={() => { this.getList(this.state.previousPage, null) }} disabled={(this.state.previousPage) ? false : true}>
                                    <i className="fa fa-fw fa-chevron-left"></i>
                                </Button>
                                <Button size="sm" outline onClick={() => { this.getList(this.state.nextPage, null) }} disabled={(this.state.nextPage) ? false : true}>
                                    <i className="fa fa-fw fa-chevron-right"></i>
                                </Button>
                            </ButtonGroup>

                        </React.Fragment>
                    )
                }
            </ToolkitProvider>
        );
    }
}