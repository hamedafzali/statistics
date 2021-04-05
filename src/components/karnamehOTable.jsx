import React, { Component } from "react";
import Table from "./common/table";

class KarnamehTable extends Component {
  state = { fs: 14 };
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
    const { data, height, title } = this.props;

    return (
      <Table columns={this.columns} data={data} height={height} title={title} />
    );
  }
}

export default KarnamehTable;
