import React, { Component } from "react";
import Table from "./common/table";

class supervisorsRankTable extends Component {
  columns = [
    { path: "Val", label: "ردیف", sorted: true },
    { path: "Count", label: "تعداد شعبه" },
    { path: "Rank", label: "طبقه" },
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
export default supervisorsRankTable;
