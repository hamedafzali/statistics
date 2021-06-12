import React, { Component } from "react";
import Table from "./common/table";

class BranchesRankTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "Title", label: "نام واحد" },
    { path: "BranchCode", label: "کد واحد" },
    { path: "SumScore", label: "ساعت اضافه کار" },
    { path: "PersonCount", label: "تعداد پرسنل" },
    { path: "SumAmount", label: "متوسط تخصیصی" },
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

export default BranchesRankTable;
