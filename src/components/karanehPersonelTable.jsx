import React, { Component } from "react";
import Table from "./common/table";

class KaranehPersonelTable extends Component {
  columns = [
    { path: "Supervisor", label: "نام واحد" },
    { path: "Branch", label: "شعبه/واحد" },
    { path: "Code", label: "کد" },
    { path: "Name", label: "نام " },
    { path: "Family", label: "نام خانوادگی" },
    { path: "NationalCode", label: "کد ملی" },
    { path: "BaseAmount", label: "مبلغ پایه" },
    { path: "BaseAmountCalced", label: "مبلغ محاسباتی" },
  ];

  render() {
    const { data, onSort, sortColumn, allData } = this.props;

    return (
      <Table
        columns={this.columns}
        data={data}
        sortColumn={sortColumn}
        onSort={onSort}
        allData={allData}
      />
    );
  }
}

export default KaranehPersonelTable;
