import React, { Component } from "react";
import Table from "./common/table";
import Switch from "./common/switch";
class karanehManagersTable extends Component {
  state = { fs: 14 };

  columns = [
    { path: "type", label: "نوع طرح" },
    { path: "سرپرستی", label: "سرپرستی" },
    { path: "کد سرپرستی", label: "کد سرپرستی" },
    { path: "نام واحد", label: "نام واحد" },
    { path: "کد واحد", label: "کد واحد" },
    { path: "نوع واحد", label: "نوع واحد" },
    {
      path: "Id",
      headerContent: (
        <Switch
          name={"headerSW"}
          onChange={() => this.props.handleKaranehAccess(0)}
          checked={
            true
            // this.props.data.filter((i) => i.Status === 1).length ===
            // this.props.data.length
            //   ? true
            //   : false
          }
        />
      ),
      content: (item) => (
        <Switch
          name={item.Code}
          onChange={() => this.props.handleKaranehAccess(item.Code)}
          checked={parseInt(item.Status) === 1 ? true : false}
        />
      ),
    },
  ];
  handleSize = (c) => {
    this.setState({ fs: this.state.fs + c });
  };
  render() {
    const { data, onSort, sortColumn, allData, onCommit, tbhandleChange } =
      this.props;
    //console.log(this.props.checked);
    // console.log(
    //   this.props.data.filter((i) => i.Status === 0).length,
    //   this.props.data.length
    // );
    return (
      <Table
        columns={this.columns}
        data={data}
        sortColumn={sortColumn}
        onSort={onSort}
        handleSize={this.handleSize}
        fs={this.state.fs}
        allData={allData}
        onCommit={onCommit}
        tbhandleChange={tbhandleChange}
      />
    );
  }
}

export default karanehManagersTable;
