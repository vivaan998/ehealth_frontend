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
    // Badge,
    Button,
    // CustomInput,
    // StarRating,
    ButtonGroup,
} from "../../../../components";
import { CustomExportCSV } from "./CustomExportButton";
import { CustomSearch } from "./CustomSearch";
import { CustomPaginationPanel } from "./CustomPaginationPanel";
import { CustomSizePerPageButton } from "./CustomSizePerPageButton";
import { CustomPaginationTotal } from "./CustomPaginationTotal";
// import { randomArray } from './../../../../utilities';
import {
    buildCustomTextFilter,
    // buildCustomSelectFilter,
    // buildCustomNumberFilter
} from "../filters";

import ImmunizationsService from './../../../../services/ImmunizationsService';
import AuthenticationService from './../../../../services/AuthenticationService';

const sortCaret = (order) => {
    if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};


export default class ImmunizationsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            immunizationsList: [],
            previousPage: '',
            nextPage: '',
        };

        this.headerCheckboxRef = React.createRef();
    }

    getList = async (page=null, search=null) => {
        try {
            const paramData = {
                page: page,
                search: search
            }
            
            if (this.props.location.vaccine_id){
                console.log("immunizations vaccine_id>>>", this.props.location.vaccine_id);
                const response = await ImmunizationsService.getPractitionerOfThisProvider(this.props.location.vaccine_id);
                if (response.status == true){
                    this.setState({
                        practitionersList: response.data.result,
                        nextPage: response.data.next_page,
                        previousPage: response.data.previous_page,
                    });
                }
            }
            else{
                const response = await ImmunizationsService.getList(paramData);
                if (response.status == true){
                    this.setState({
                        practitionersList: response.data.result,
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
        if (AuthenticationService.getUser()) {
            this.getList();
        }
        else {
            this.props.history.push({
                pathname: "/login",
            })
        }
    }

    // handleSelect(row, isSelected) {
    //     if (isSelected) {
    //         this.setState({ selected: [...this.state.selected, row.id] })
    //     } else {
    //         this.setState({
    //             selected: this.state.selected.filter(itemId => itemId !== row.id)
    //         })
    //     }
    // }

    // handleSelectAll(isSelected, rows) {
    //     if (isSelected) {
    //         this.setState({ selected: _.map(rows, 'id') })
    //     } else {
    //         this.setState({ selected: [] });
    //     }
    // }

    // handleDeleteRow() {
    //   this.setState({
    //     products: _.filter(
    //       this.state.products,
    //       (product) => !_.includes(this.state.selected, product.id)
    //     ),
    //   });
    // }

    // handleResetFilters() {
    //   this.nameFilter("");
    //   this.qualityFilter("");
    //   this.priceFilter("");
    //   this.satisfactionFilter("");
    // }

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
                Archive
            </Button>
        );
    };
    createColumnDefinitions() {
        return [
            {
                dataField: "immunization_id",
                hidden: true,
                isKey: true
            },
            {
                dataField: "immunizationDate",
                text: "Immunization Date",
                formatter: (cell) => moment(cell).format("DD/MM/YYYY"),
                // filter: dateFilter({
                //     className: "d-flex align-items-center",
                //     comparatorClassName: "d-none",
                //     dateClassName: "form-control form-control-sm",
                //     comparator: Comparator.GT,
                //     getFilter: (filter) => {
                //         this.stockDateFilter = filter;
                //     },
                // }),
                sort: true,
                sortCaret,
            },
            {
                dataField: "patientName",
                text: "Patient Name",
                sort: true,
                // align: "center",
                sortCaret,
                formatter: (cell) => <span className="text-inverse">{cell}</span>,
                // ...buildCustomTextFilter({
                //     placeholder: "Enter Patient name...",
                //     getFilter: (filter) => {
                //         this.nameFilter = filter;
                //     },
                // }),
            }, {
                dataField: "vaccineName",
                text: "Vaccine Name",
                sort: true,
                // align: "center",
                sortCaret,
                formatter: (cell) => <span className="text-inverse">{cell}</span>,
                // ...buildCustomTextFilter({
                //     placeholder: "Enter Vaccine name...",
                //     getFilter: (filter) => {
                //         this.nameFilter = filter;
                //     },
                // }),
            }, {
                dataField: "administeredBy",
                text: "Administered By",
                sort: true,
                // align: "center",
                sortCaret,
                formatter: (cell) => <span className="text-inverse">{cell}</span>,
                // ...buildCustomTextFilter({
                //     placeholder: "Enter Administered name...",
                //     getFilter: (filter) => {
                //         this.nameFilter = filter;
                //     },
                // }),
            },
            {
                text: "Action",
                formatter: this.actionColButton
                // sort: true,
                // align: "center",
                // sortCaret,

            },
        ];
    }

    render() {
        const columnDefs = this.createColumnDefinitions();
        console.log(this.state.immunizationsList);
        return (
            <ToolkitProvider
                keyField="id"
                data={this.state.immunizationsList}
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
                            filter={filterFactory()}
                            // selectRow={ selectRowConfig }
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
