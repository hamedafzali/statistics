import React, { Component } from "react";
import Table from "./common/table";

class supervisorsRankTable extends Component {
  columns = [
    { path: "Count", label: "تعداد شعبه" },
    { path: "Rank", label: "طبقه", sorted: true },
  ];

  render() {
    const { data, title } = this.props;
    return <Table columns={this.columns} data={data} title={title} />;
  }
}
export default supervisorsRankTable;
