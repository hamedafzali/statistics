import React, { Component } from "react";
import Table from "./common/table";

class ProductTable extends Component {
  columns = [
    { path: "واحد ناظر", label: "واحد ناظر" },
    { path: "واحد", label: "واحد" },
    { path: "نام", label: "نام" },
    { path: "نام خانوادگی", label: "نام خانوادگی" },
    // { path: "مبلغ", label: "مبلغ محاسباتی", type: "text", seprated: true },
    { path: "A50", label: "مبلغ ثابت", type: "text", seprated: true },
    this.props.employee.GroupId === 4 || this.props.employee.GroupId === 2
      ? {
          path: "A30",
          label: "رئیس شعبه",
          
          seprated: true,
          type: this.props.employee.GroupId === 4 ? "input" : "",
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
              ? "مدیر اداره کل"
              : "مدیریت سرپرستی شعب",
          type: "input",
          seprated: true,
          disabled: true,
        }
      : "",

    {
      path: "مبلغ فردی",
      label: "خدمات کارگزاری",
      type: "text",
      seprated: true,
    },
    { path: "مبلغ شعبه ای", label: "خدمات ارزی", type: "text", seprated: true },
    { path: "جمع کل با حد", label: "مبلغ نهایی", type: "text", seprated: true },

    { label: "ثبت", type: "button" },
  ];

  render() {
    const { data, onCommit, tbhandleChange } = this.props;

    return (
      <Table
        columns={this.columns}
        data={data}
        onCommit={onCommit}
        tbhandleChange={tbhandleChange}
      />
    );
  }
}

export default ProductTable;
