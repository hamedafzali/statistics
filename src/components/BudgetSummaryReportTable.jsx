import React, { Component } from "react";
import Table from "./common/table";

class BudgetSummaryReportTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "Title", label: "شرح" },
    { path: "Code", label: "کد" },
    { path: "mosavab", label: "بودجه مصوب", seprated: true, type: "text" },
    { path: "eslahieh", label: "اصلاحیه", seprated: true, type: "text" },
    { path: "eblagh", label: "ابلاغ", seprated: true, type: "text" },
    {
      path: "nesbatMosavab",
      label: "مانده نسبت به مصوب",
      seprated: true,
      type: "text",
    },
    {
      path: "nesbatEslahieh",
      label: "مانده نسبت به اصلاحیه",
      seprated: true,
      type: "text",
    },
  ];

  render() {
    const { data, title } = this.props;

    return <Table title={title} data={data} columns={this.columns} />;
  }
}

export default BudgetSummaryReportTable;
