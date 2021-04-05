import React, { Component } from "react";
import Table from "./common/table";

class PersonsListTable extends Component {
  columns = [
    { path: "واحد ناظر", label: "واحد ناظر" },
    { path: "کد واحد ناظر", label: "کد واحد ناظر" },
    { path: "نوع واحد ناظر", label: "نوع واحد ناظر" },
    { path: "واحد", label: "واحد" },
    { path: "کد واحد", label: "کد واحد" },
    { path: "نوع واحد", label: "نوع واحد" },
    { path: "نام", label: "نام" },
    { path: "نام خانوادگی", label: "نام خانوادگی" },
    { path: "کد ملی", label: "کد ملی" },
    { path: "وضعیت", label: "وضعیت" },
    { path: "واجد دریافت", label: "واجد دریافت" },
    { path: "پست سازمانی", label: "پست سازمانی" },
  ];

  render() {
    const { data, title } = this.props;
    //console.log(this.props);
    return <Table columns={this.columns} data={data} title={title} />;
  }
}

export default PersonsListTable;
