import React, { Component } from "react";
import Table from "./common/table";

class KaranehPersonelTable extends Component {
  columns = [
    { path: "سرپرستی", label: "نام واحد" },
    { path: "Branch", label: "شعبه/واحد" },
    { path: "Code", label: "کد" },
    { path: "نام", label: "نام " },
    { path: "نام خانوادگی", label: "نام خانوادگی" },
    { path: "کد ملی", label: "کد ملی" },
    { path: "BaseAmount", label: "مبلغ پایه" },
    { path: "BaseAmountCalced", label: "مبلغ محاسباتی" },
  ];

  render() {
    const { data, title, loading } = this.props;

    return (
      <Table
        columns={this.columns}
        data={data}
        title={title}
        loading={loading}
      />
    );
  }
}

export default KaranehPersonelTable;
