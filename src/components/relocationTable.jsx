import React, { Component } from "react";
import Table from "./common/table";

class RelocationTable extends Component {
  columns = [
    { path: "time", label: "زمان ثبت" },
    { path: "PayDate", label: "تاریخ " },
    { path: "NationalCode", label: "کد ملی" },
    { path: "Name", label: "نام" },
    { path: "Family", label: "نام خانوادگی" },
    { path: "Eligible", label: "واجد دریافت" },
    { path: "PersonStatus", label: "وضعیت اشتغال" },
    { path: "SourceName", label: "مبداً" },
    { path: "DestinationName", label: "مقصد" },
    { path: "PostType", label: "پست سازمانی" },
    { path: "Description", label: "توضیحات" },
    { path: "StatusTitle", label: "وضعیت" },
    { id: "Id", icon: "check" },
  ];
  handleSize = (c) => {
    this.setState({ fs: this.state.fs + c });
  };
  render() {
    const { data, title, onCommit } = this.props;

    return (
      <Table
        columns={this.columns}
        data={data}
        onCommit={onCommit}
        title={title}
      />
    );
  }
}

export default RelocationTable;
