import React, { Component } from "react";
import Table from "./common/table";

class BudgetAllocationCostDetailReportTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "Title", label: "واحد مقصد" },
    { path: "DestinationCode", label: "کد واحد مقصد" },
    { path: "Code", label: "کد سرفصل" },
    { path: "BudgetTitle", label: "عنوان سرفصل" },
    { path: "ابلاغی", label: "اعتبار ابلاغی", seprated: true, type: "text" },
    {
      path: "عملکرد از ابتدای سال",
      label: "عملکرد از ابتدای سال",
      seprated: true,
      type: "text",
    },
    {
      path: "عملکرد ماه جاری",
      label: "عملکرد ماه جاری",
      seprated: true,
      type: "text",
    },
    { path: "جمع عملکرد", label: "جمع عملکرد", seprated: true, type: "text" },
    { path: "مانده", label: "مانده", seprated: true, type: "text" },
  ];

  render() {
    const { data, title } = this.props;

    return <Table title={title} data={data} columns={this.columns} />;
  }
}

export default BudgetAllocationCostDetailReportTable;
