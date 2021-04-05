import React, { Component } from "react";
import Table from "./common/table";

class SupervisorTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "Code", label: "کد" },
    { path: "Title", label: "نام" },
  ];
  handleSize = (c) => {
    this.setState({ fs: this.state.fs + c });
  };
  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        handleSize={this.handleSize}
        fs={this.state.fs}
      />
    );
  }
}

export default SupervisorTable;
