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

// const ProductQuality = {
//     Good: 'product-quality__good',
//     Bad: 'product-quality__bad',
//     Unknown: 'product-quality__unknown'
// };

const sortCaret = (order) => {
  if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
  if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

export default class ProviderTable extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [
        {
          id: 0,
          dateAdded: "Mon Jan 04 2021 04:03:00 GMT+0530 (India Standard Time)",
          providerName: "c",
        },
        {
          id: 1,
          dateAdded: "Mon Jan 04 2021 04:03:00 GMT+0530 (India Standard Time)",
          providerName: "b",
        },
        {
          id: 2,
          dateAdded: "Mon Jan 04 2021 04:03:00 GMT+0530 (India Standard Time)",
          providerName: "a",
        },
      ],
    };

    this.headerCheckboxRef = React.createRef();
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

  handleResetFilters() {
    this.nameFilter("");
    this.qualityFilter("");
    this.priceFilter("");
    this.satisfactionFilter("");
  }

  // handlePractitionersOnClick(cell, row) {
  //   console.log("Practitioners Button clicked, rowId:", row.id);
  // }

  // onClickAppointments(cell, row) {
  //   console.log("Appointments button clicked, rowId:", row.id);
  // }

  // onClickArchive(cell, row) {
  //   console.log("Archive button clicked, rowId:", row.id);
  // }

  // handleArchive(cell, row){
  //   console.log(row.id);
  // }

  // actionColButton(cell, row, enumObject, rowIndex) {
  //   return (
  //     // <ButtonGroup>
  //     //   {" "}
  //       <Button
  //         size="sm"
  //         outline
  //         color="primary"
  //         onClick={() => this.handleArchive(cell, row)}        >
  //         Practitioners
  //       </Button>
  //     //   <Button
  //     //     size="sm"
  //     //     outline
  //     //     color="purple"
  //     //     onClick={() => this.onClickAppointments(cell, row)}
  //     //   >
  //     //     Appointments
  //     //   </Button>
  //     //   <Button
  //     //     size="sm"
  //     //     outline
  //     //     color="danger"
  //     //     onClick={() => this.onClickArchive(cell, row)}
  //     //   >
  //     //     Archive
  //     //   </Button>
  //     // </ButtonGroup>
  //   );
  // }

  handleAppointmentsOnClick(cell, row) {
    console.log("Appointments button clicked, rowId:", row.id);
  }

  handleArchiveOnClick(cell, row) {
    console.log("Archive button clicked, rowId:", row.id);
  }

  handlePractitionersOnClick(cell, row) {
    console.log("Practitioners Button clicked, rowId:", row.id);
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

  createColumnDefinitions() {
    return [
      {
        dataField: "id",
        hidden: true,
        isKey: true,
      },
      {
        dataField: "providerName",
        text: "Provider Name",
        sort: true,
        // align: "center",
        sortCaret,
        formatter: (cell) => <span className="text-inverse">{cell}</span>,
        ...buildCustomTextFilter({
          placeholder: "Enter Provider name...",
          getFilter: (filter) => {
            this.nameFilter = filter;
          },
        }),
      },
      {
        dataField: "dateAdded",
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
    // const selectRowConfig = {
    //     mode: 'checkbox',
    //     selected: this.state.selected,
    //     onSelect: this.handleSelect.bind(this),
    //     onSelectAll: this.handleSelectAll.bind(this),
    //     selectionRenderer: ({ mode, checked, disabled }) => (
    //         <CustomInput type={ mode } checked={ checked } disabled={ disabled } />
    //     ),
    //     selectionHeaderRenderer: ({ mode, checked, indeterminate }) => (
    //         <CustomInput type={ mode } checked={ checked } innerRef={el => el && (el.indeterminate = indeterminate)} />
    //     )
    // };
    console.log(this.state.products);
    return (
      <ToolkitProvider
        keyField="id"
        data={this.state.products}
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
              // selectRow={ selectRowConfig }
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
