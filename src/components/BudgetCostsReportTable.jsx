import React, { Component } from "react";
import Table from "./common/table";

class BudgetCostsReportTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "Date", label: "تاریخ" },
    { path: "Title", label: "شرح" },
    { path: "Registrar", label: "ثبت کننده" },
    { path: "Commit1", label: "تایید کننده" },
    { path: "Amount", label: "مبلغ", seprated: true, type: "text" },
  ];

  render() {
    const { data, title } = this.props;

    return <Table title={title} data={data} columns={this.columns} />;
  }
}

export default BudgetCostsReportTable;
