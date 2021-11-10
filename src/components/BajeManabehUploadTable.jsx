import React, { Component } from "react";
import ExcelDownloader from "../utils/ExcelDownloader";
import Table from "./common/table";

class BajeManabehUploadTable extends Component {
  selectedColumns = [
    { path: "Date", label: "تاریخ" },
    { path: "نام سرپرستي", label: "نام سرپرستي" },
    { path: "نام شعبه", label: "نام شعبه" },
    { path: "کد شعبه", label: "کد شعبه" },
    { path: " قرض الحسنه جاري", label: " قرض الحسنه جاري" },
    { path: "قرض الحسنه پس انداز", label: "قرض الحسنه پس انداز" },
    { path: "سرمايه گذاري کوتاه مدت", label: "سرمايه گذاري کوتاه مدت" },
    { path: "سرمايه گذاري بلند مدت", label: "سرمايه گذاري بلند مدت" },
  ];
  columns = [
    { path: "Date", label: "تاریخ" },
    { path: "Count", label: "تعداد" },
    { path: "jari", label: "قرض الحسنه جاری", type: "text", seprated: true },
    {
      path: "قرض الحسنه پس انداز",
      label: "قرض الحسنه پس انداز ",
      type: "text",
      seprated: true,
    },
    {
      path: "سرمایه گذاری کوتاه مدت",
      label: "سرمایه گذاری کوتاه مدت",
      type: "text",
      seprated: true,
    },
    {
      path: "سرمایه گذاری بلند مدت",
      label: "سرمایه گذاری بلند مدت",
      type: "text",
      seprated: true,
    },
    {
      path: "Date",
      content: (item) => (
        <div
          key="item.Date"
          //className="btn btn-primary"
          className={
            this.props.selectedDate === item.Date
              ? "btn btn-outline-success text-danger disabled"
              : "btn btn-primary "
          }
          onClick={() => this.props.onClick(item.Date)}
        >
          {this.props.selectedDate === item.Date && this.props.selectedData
            ? "آماده دانلود"
            : "انتخاب "}
        </div>
      ),
    },
    {
      path: "Date",
      content: (item) => (
        <ExcelDownloader
          name={`منابع دفاتر ${item.Date}`}
          columns={this.selectedColumns}
          icon={
            this.props.selectedDate === item.Date ? (
              <i
                className={`btn-outline-success fa fa-fw fa-download `}
                style={{ fontSize: "1.65em", cursor: "pointer" }}
              />
            ) : (
              ""
            )
          }
          data={this.props.selectedData}
        />
      ),
    },
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

export default BajeManabehUploadTable;
