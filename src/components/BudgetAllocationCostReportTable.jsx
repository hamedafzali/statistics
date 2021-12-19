import React, { Component } from "react";
import Table from "./common/table";

class BudgetAllocationCostReportTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "Title", label: "واحد مقصد" },
    { path: "DestinationCode", label: "کد واحد مقصد" },
    { path: "ابلاغی", label: "ابلاغی", seprated: true, type: "text" },
    { path: "هزینه", label: "هزینه", seprated: true, type: "text" },
  ];

  render() {
    const { data, title } = this.props;

    return <Table title={title} data={data} columns={this.columns} />;
  }
}

export default BudgetAllocationCostReportTable;
