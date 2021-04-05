import React, { Component } from "react";
import Table from "./common/table";

class AdditionTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "Name", label: "نوع" },
    { path: "AddedAmount", label: "جمع مبلغ پیشنهادی" },
    { path: "AddedHours", label: "جمع ساعت پیشنهادی" },
    { path: "SumAmount", label: "جمع کل" },
  ];
  handleSize = (c) => {
    this.setState({ fs: this.state.fs + c });
  };
  render() {
    const { data, title } = this.props;

    return <Table columns={this.columns} data={data} title={title} />;
  }
}

export default AdditionTable;
