import React, { Component } from "react";
import ExcelDownloader from "../utils/ExcelDownloader";
import Table from "./common/table";

class BranchAdditionUploadTable extends Component {
  //   selectedColumns = [
  //     { path: "Date", label: "تاریخ" },
  //     { path: "نام سرپرستي", label: "نام سرپرستي" },
  //     { path: "نام شعبه", label: "نام شعبه" },
  //     { path: "کد شعبه", label: "کد شعبه" },
  //     { path: " قرض الحسنه جاري", label: " قرض الحسنه جاري" },
  //     { path: "قرض الحسنه پس انداز", label: "قرض الحسنه پس انداز" },
  //     { path: "سرمايه گذاري کوتاه مدت", label: "سرمايه گذاري کوتاه مدت" },
  //     { path: "سرمايه گذاري بلند مدت", label: "سرمايه گذاري بلند مدت" },
  //   ];
  columns = [
    {
      path: "Name",
      label: "نوع",
    },
    { path: "Date", label: "تاریخ" },
    { path: "Count", label: "تعداد" },
    {
      path: "AddedHours",
      label: "ساعت",
      type: "text",
      seprated: true,
    },
    {
      path: "AddedAmount",
      label: "مبلغ ",
      type: "text",
      seprated: true,
    },

    // {
    //   path: "Date",
    //   content: (item) => (
    //     <div
    //       key="item.Date"
    //       //className="btn btn-primary"
    //       className={
    //         this.props.selectedDate === item.Date
    //           ? "btn btn-outline-success text-danger disabled"
    //           : "btn btn-primary "
    //       }
    //       onClick={() => this.props.onClick(item.Date)}
    //     >
    //       {this.props.selectedDate === item.Date && this.props.selectedData
    //         ? "آماده دانلود"
    //         : "انتخاب "}
    //     </div>
    //   ),
    // },
    // {
    //   path: "Date",
    //   content: (item) => (
    //     <ExcelDownloader
    //       name={`منابع دفاتر ${item.Date}`}
    //       columns={this.selectedColumns}
    //       icon={
    //         this.props.selectedDate === item.Date ? (
    //           <i
    //             className={`btn-outline-success fa fa-fw fa-download `}
    //             style={{ fontSize: "1.65em", cursor: "pointer" }}
    //           />
    //         ) : (
    //           ""
    //         )
    //       }
    //       data={this.props.selectedData}
    //     />
    //   ),
    // },
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

export default BranchAdditionUploadTable;
