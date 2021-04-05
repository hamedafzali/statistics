import React, { Component } from "react";
import Table from "./common/table";

class CEOConfirmTable extends Component {
  columns = [
    { path: "استان", label: "استان" },
    { path: "نام شعبه", label: "شعبه" },
    { path: "Name", label: "نام" },
    { path: "Family", label: "نام خانوادگی" },
    { path: "BaseAmountCalced", label: "مبلغ کارانه عادی" },
    // { path: "BaseAmountCalced", label: "مبلغ محاسباتی" },
    // { path: "A50", label: "مبلغ ثابت(50%)" },
    // this.props.employee.GroupId === 4 || this.props.employee.GroupId === 2
    //   ? {
    //       path: "A30",
    //       label: "رئیس شعبه(30%)",
    //       type: "inputnumber",
    //       type: this.props.employee.GroupId === 4 ? "input" : "",
    //     }
    //   : "",
    // this.props.employee.GroupId === 2 ||
    // this.props.employee.GroupId === 7 ||
    // this.props.employee.GroupId === 10
    //   ? {
    //       path: "A20",
    //       label:
    //         this.props.employee.GroupId === 7 ||
    //         this.props.employee.GroupId === 10
    //           ? "مدیر اداره کل(50%)"
    //           : "مدیریت سرپرستی شعب",
    //       type: "inputnumber",
    //       disabled: true,
    //     }
    //   : "",

    { path: "PersonAddition", label: "خدمات کارگزاری" },
    { path: "BranchAddition", label: "خدمات ارزی" },
    { path: "LimitedTotal", label: "مبلغ نهایی" },

    // { label: "ثبت", type: "button" },
  ];

  render() {
    const { data, title } = this.props;
    //console.log(this.props);
    return <Table columns={this.columns} data={data} title={title} />;
  }
}

export default CEOConfirmTable;
