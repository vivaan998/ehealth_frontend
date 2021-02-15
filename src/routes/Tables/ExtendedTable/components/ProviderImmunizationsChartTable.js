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

import VaccinesService from './../../../../services/VaccinesService';
import AuthenticationService from './../../../../services/AuthenticationService';

const sortCaret = (order) => {
    if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

export default class ProviderImmunizationsChartTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            provider_name: "",
            immunizations: 1,
            isGettingData: false
        };

        this.headerCheckboxRef = React.createRef();
    }
    
    createColumnDefinitions() {
        return [
            {
                dataField: "provider_id",
                hidden: true,
                isKey: true,
            },
            {
                dataField: "provider",
                text: "Provider",
                sort: true,
                sortCaret,
                formatter: (cell) => <span className="text-inverse">{cell}</span>,
            },
            {
                dataField: "total_immunizations",
                text: "Total Immunization",
                sort: true,
                sortCaret,
                formatter: (cell) => <span className="text-inverse">{cell}</span>,
            },

        ];
    }

    

    render() {
        const columnDefs = this.createColumnDefinitions();

        return (
            <ToolkitProvider
                keyField="id"
                data={this.state.data}
                columns={columnDefs}
            >
                {(props) => (
                    <React.Fragment>
                       
                        <BootstrapTable
                            classes="table-responsive-sm"
                            filter={filterFactory()}
                            bordered={true}
                            responsive
                            {...props.baseProps}
                        />
                    </React.Fragment>
                )}
            </ToolkitProvider>
        );
    }
}
