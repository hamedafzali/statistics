import React, { Component } from "react";
import Table from "./common/table";

class ManagerCommitTable extends Component {
  state = {
    fs: 14,
  };

  columns = [
    { path: "استان", label: "استان" },
    { path: "نام شعبه", label: "شعبه" },
    { path: "Name", label: "نام" },
    { path: "Family", label: "نام خانوادگی" },
    { path: "BaseAmountCalced", label: "مبلغ محاسباتی" },
    { path: "A50", label: "مبلغ ثابت(50%)" },
    this.props.employee.GroupId === 4 || this.props.employee.GroupId === 2
      ? {
          path: "A30",
          label: "رئیس شعبه(30%)",
          
          type: this.props.employee.GroupId === 4 ? "input" : "inputnumber",
        }
      : "",
    this.props.employee.GroupId === 2 ||
    this.props.employee.GroupId === 7 ||
    this.props.employee.GroupId === 10
      ? {
          path: "A20",
          label:
            this.props.employee.GroupId === 7 ||
            this.props.employee.GroupId === 10
              ? "مدیر اداره کل(50%)"
              : "مدیریت سرپرستی شعب",
          type: "inputnumber",
          disabled: true,
        }
      : "",

    { path: "PersonAddition", label: "خدمات کارگزاری" },
    { path: "BranchAddition", label: "خدمات ارزی" },
    { path: "Total", label: "مبلغ نهایی" },

    { label: "ثبت", type: "button" },
  ];

  handleSize = (c) => {
    this.setState({ fs: this.state.fs + c });
  };
  render() {
    const { data, onSort, sortColumn } = this.props;
    //console.log(this.props);
    return (
      <Table
        columns={this.columns}
        data={data}
        sortColumn={sortColumn}
        onSort={onSort}
        fs={this.state.fs}
        handleSize={this.handleSize}
        onCommit={this.props.onCommit}
        tbhandleChange={this.props.tbhandleChange}
        allData={this.props.allData}
      />
    );
  }
}

export default ManagerCommitTable;
