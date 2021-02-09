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
import axios from 'axios';
import paths from './../../../../config/Endpoint';
import AuthenticationService from './../../../../services/AuthenticationService';

import {
    Button,
    ButtonGroup,
} from "../../../../components";
import { CustomExportCSV } from "./CustomExportButton";
import { CustomSearch } from "./CustomSearch";
import { CustomPaginationPanel } from "./CustomPaginationPanel";
import { CustomSizePerPageButton } from "./CustomSizePerPageButton";
import { CustomPaginationTotal } from "./CustomPaginationTotal";
import {
    buildCustomTextFilter
} from "../filters";

import PractitionersService from './../../../../services/PractitionersService';

const sortCaret = (order) => {
    if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

export default class PractitionersTable extends React.Component {
    constructor() {
        super();

        this.state = {
            practitionersList: [],
        };

        this.headerCheckboxRef = React.createRef();
    }

    getList = async () => {
        try {
            const response = await PractitionersService.getList();
            if (response.status == true) {
                this.setState({
                    practitionersList: response.data.result,
                });
                console.log('practitionersList >>>', this.state.practitionersList);
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

        }
        else {
            this.props.history.push({
                pathname: "/login",
            })
        }
    }

    // handleAddRow() {
    //   const currentSize = this.state.products.length;

    //   this.setState({
    //     products: [generateRow(currentSize + 1), ...this.state.products],
    //   });
    // }

    handleDeleteRow() {
        this.setState({
            products: _.filter(
                this.state.products,
                (product) => !_.includes(this.state.selected, product.id)
            ),
        });
    }

    handleImmunizationsOnClick(cell, row) {
        console.log("Immunizations Button clicked, rowId:", row.practitioner_id);
    }

    handleAppointmentsOnClick(cell, row) {
        console.log("Appointments button clicked, rowId:", row.practitioner_id);
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
                // align: "center",
                sortCaret,
                formatter: (cell) => <span className="text-inverse">{cell}</span>,
                ...buildCustomTextFilter({
                    placeholder: "Enter First name...",
                    getFilter: (filter) => {
                        this.nameFilter = filter;
                    },
                }),
            },
            {
                dataField: "last_name",
                text: "Last Name",
                sort: true,
                // align: "center",
                sortCaret,
                formatter: (cell) => <span className="text-inverse">{cell}</span>,
                ...buildCustomTextFilter({
                    placeholder: "Enter Last name...",
                    getFilter: (filter) => {
                        this.nameFilter = filter;
                    },
                }),
            },
            {
                dataField: "type",
                text: "Last Name",
                sort: true,
                // align: "center",
                sortCaret,
                formatter: (cell) => <span className="text-inverse">Doctor</span>,
                ...buildCustomTextFilter({
                    placeholder: "Enter Last name...",
                    getFilter: (filter) => {
                        this.nameFilter = filter;
                    },
                }),
            },
            {
                dataField: "created_dt",
                text: "Date Added",
                formatter: (cell) => moment(cell).format("DD/MM/YYYY"),
                filter: dateFilter({
                    className: "d-flex align-items-center",
                    comparatorClassName: "d-none",
                    dateClassName: "form-control form-control-sm",
                    comparator: Comparator.GT,
                    getFilter: (filter) => {
                        this.stockDateFilter = filter;
                    },
                }),
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
        const paginationDef = paginationFactory({
            paginationSize: 5,
            showTotal: true,
            pageListRenderer: (props) => (
                <CustomPaginationPanel
                    {...props}
                    size="sm"
                    className="ml-md-auto mt-2 mt-md-0"
                />
            ),
            sizePerPageRenderer: (props) => <CustomSizePerPageButton {...props} />,
            paginationTotalRenderer: (from, to, size) => (
                <CustomPaginationTotal {...{ from, to, size }} />
            ),
        });
        return (
            <ToolkitProvider
                keyField="id"
                data={this.state.practitionersList}
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
                                    <CustomExportCSV {...props.csvProps}>Export</CustomExportCSV>
                                    <Button
                                        size="sm"
                                        outline
                                    // onClick={this.handleDeleteRow.bind(this)}
                                    >
                                        Delete
                                    </Button>
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
                            classes="table-responsive"
                            pagination={paginationDef}
                            filter={filterFactory()}
                            bordered={false}
                            responsive
                            {...props.baseProps}
                        />
                    </React.Fragment>
                )}
            </ToolkitProvider>
        );
    }
}