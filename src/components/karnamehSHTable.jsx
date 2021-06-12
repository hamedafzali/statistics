import React, { Component } from "react";
import Table from "./common/table";

class KarnamehSHTable extends Component {
  columns = [
    { path: "Supervisor", label: "سرپرستی" },
    { path: "Branch", label: "شعبه" },
    { path: "Code", label: "کد" },
    { path: "Yearly", label: "کارنامه تجمعی" },
    { path: "Monthly", label: "کارنامه ماهانه" },
    { path: "calced", label: "تلفیقی" },
    { path: "LimitedCalced", label: "با اعمال حد" },
  ];
  render() {
    const { data, title, height, loading } = this.props;
    return (
      <Table
        columns={this.columns}
        data={data}
        title={title}
        height={height}
        loading={loading}
      />
    );
  }
}
export default KarnamehSHTable;
