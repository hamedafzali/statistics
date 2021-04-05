import React, { Component } from "react";
import Table from "./common/table";

class karanehManagersTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "واحد سازمانی", label: "واحد سازمانی" },
    { path: "Post", label: "ردیف" },
    { path: "Name", label: "نام" },
    { path: "Family", label: "نام خانوادگی" },
    { path: "NationalCode", label: "کد ملی" },
    { path: "کارنامه طرح پویش تجمعی 99", label: "کارنامه طرح پویش تجمعی 99" },
    { path: "کارنامه طرح پویش ماهانه 99", label: "کارنامه طرح پویش ماهانه 99" },
    { path: "محاسبه امتیاز تلفیقی", label: "محاسبه امتیاز تلفیقی" },
    {
      path: "A50",
      label: "مبلغ",
      type: "input",
      seprated: true,
    },
    { label: "ثبت", type: "button" },
  ];
  handleSize = (c) => {
    this.setState({ fs: this.state.fs + c });
  };
  render() {
    const { data, onSort, sortColumn, allData } = this.props;

    return (
      <Table
        columns={this.columns}
        data={data}
        sortColumn={sortColumn}
        onSort={onSort}
        handleSize={this.handleSize}
        fs={this.state.fs}
        allData={allData}
        onCommit={this.props.onCommit}
        tbhandleChange={this.props.tbhandleChange}
      />
    );
  }
}

export default karanehManagersTable;
