import React, { Component } from "react";
import Table from "./common/table";

class ProductTable extends Component {
  columns = [
    { path: "واحد ناظر", label: "واحد ناظر" },
    { path: "واحد", label: "واحد" },
    { path: "نام", label: "نام" },
    { path: "نام خانوادگی", label: "نام خانوادگی" },
    // {
    //   path: "مبلغ فردی",
    //   label: "کارگزاری",
    //   type: "text",
    //   seprated: true,
    //   color: "bg-info text-light",
    // },

    // {
    //   path: "مبلغ شعبه ای",
    //   label: "ارزی",
    //   type: "text",
    //   seprated: true,
    //   color: "bg-info text-light",
    // },

    {
      path: "مبلغ",
      label: "جمع کل(پایش و پویش/کارگزاری/ارزی)",
      type: "text",
      seprated: true,
      color: "bg-info text-light",
    },

    // {
    //   path: "مبلغ ",
    //   label: "جمع کل",
    //   type: "text",
    //   seprated: true,
    //   color: "bg-info text-light",
    // },
    {
      path: "A50",
      label: "ثابت (50% جمع کل)",
      type: "text",
      seprated: true,
      color: "border-right bg-success text-light",
    },
    this.props.employee.GroupId === 4 || this.props.employee.GroupId === 2
      ? {
          path: "A30",
          label: "رئیس شعبه (30% جمع کل)",

          seprated: true,
          type: this.props.employee.GroupId === 4 ? "input" : "",
          color: "bg-success text-light",
        }
      : { color: "bg-success text-light" },
    ,
    this.props.employee.GroupId === 2 ||
    this.props.employee.GroupId === 7 ||
    this.props.employee.GroupId === 10
      ? {
          path: "A20",
          label:
            this.props.employee.GroupId === 7 ||
            this.props.employee.GroupId === 10
              ? "مدیر اداره کل (50% جمع کل)"
              : "مدیریت سرپرستی شعب (20% جمع کل)",
          type: "input",
          seprated: true,
          disabled: true,
          color: "bg-success text-light ",
        }
      : { color: "bg-success text-light" },

    {
      path: "جمع کل با حد",
      label: "نهایی",
      type: "text",
      seprated: true,
      color: "bg-success text-light",
    },

    { label: "ثبت", type: "button" },
  ];

  render() {
    const { data, onCommit, tbhandleChange, refresh, loading } = this.props;

    return (
      <Table
        columns={this.columns}
        data={data}
        onCommit={onCommit}
        tbhandleChange={tbhandleChange}
        refresh={true}
        doRefresh={refresh}
        loading={loading}
      />
    );
  }
}

export default ProductTable;
