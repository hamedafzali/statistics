import React, { Component } from "react";
import Table from "./common/table";

class additionRegTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "Name", label: "نام" },
    { path: "Family", label: "نام خانوادگی" },
    { path: "NationalCode", label: "کد ملی" },
    { path: "AddedHours", label: "ساعت" },
    { path: "AddedAmount", label: "مبلغ" },
    { path: "AdditionType", label: "نوع" },
    { path: "Title", label: "واحد" },
    { path: "Code", label: "کد" },
  ];
  handleSize = (c) => {
    this.setState({ fs: this.state.fs + c });
  };
  render() {
    const { data, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={data}
        sortColumn={sortColumn}
        onSort={onSort}
        handleSize={this.handleSize}
        fs={this.state.fs}
      />
    );
  }
}

export default additionRegTable;
