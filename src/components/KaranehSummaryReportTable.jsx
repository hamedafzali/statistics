import React, { Component } from "react";
import Table from "./common/table";

class KaranehSummaryReportTable extends Component {
  columns = [
    { path: "Title", label: "نام واحد" },
    { path: "Code", label: "کد واحد" },
    { path: "Name", label: "نام" },
    { path: "Family", label: "نام خانوادگی" },
    { path: "فروردین", label: "فروردین", type: "text", seprated: true },
    { path: "اردیبهشت", label: "اردیبهشت", type: "text", seprated: true },
    { path: "خرداد", label: "خرداد", type: "text", seprated: true },
    { path: "تیر", label: "تیر", type: "text", seprated: true },
    { path: "مرداد", label: "مرداد", type: "text", seprated: true },
    { path: "شهریور", label: "شهریور", type: "text", seprated: true },
    { path: "مهر", label: "مهر", type: "text", seprated: true },
    { path: "آبان", label: "آبان", type: "text", seprated: true },
    { path: "آذر", label: "آذر", type: "text", seprated: true },
    { path: "دی", label: "دی", type: "text", seprated: true },
    { path: "بهمن", label: "بهمن", type: "text", seprated: true },
    { path: "اسفند", label: "اسفند", type: "text", seprated: true },
    { path: "جمع کل", label: "جمع کل", type: "text", seprated: true },
  ];

  render() {
    const { data, title } = this.props;
    //console.log(this.props);
    return <Table columns={this.columns} data={data} title={title} />;
  }
}

export default KaranehSummaryReportTable;
