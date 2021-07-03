import React, { Component } from "react";
import Table from "./common/table";

class reportTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "Description", label: "واحد" },
    { path: "Code", label: "کد" },
    { path: "Title", label: "عنوان" },
    { path: "Name", label: "نام" },
    { path: "Family", label: "نام خانوادگی" },
    { path: "NationalCode", label: "کد ملی" },
    { path: "Status", label: "وضعیت اشتغال" },
    { path: "PostType", label: "پست سازمانی" },
  ];
  handleSize = (c) => {
    this.setState({ fs: this.state.fs + c }, () => console.log(this.state));
  };
  render() {
    const { data, allData, title } = this.props;

    return (
      <Table
        columns={this.columns}
        data={data}
        handleSize={this.handleSize}
        title={title}
        allData={allData}
      />
    );
  }
}

export default reportTable;
