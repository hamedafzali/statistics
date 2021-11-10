import React, { Component } from "react";
import ExcelDownloader from "../utils/ExcelDownloader";
import Table from "./common/table";

class BajeDehyariUploadTable extends Component {
  selectedColumns = [
    { path: "Date", label: "تاریخ" },
    { path: "نام سرپرستی", label: "نام سرپرستي" },
    { path: "نام شعبه", label: "نام شعبه" },
    { path: "کد شعبه", label: "کد شعبه" },
    { path: "مبلغ سپرده  دهیاری", label: "مبلغ سپرده  دهیاری" },
    { path: "تعداد سپرده دهیاری", label: "تعداد سپرده دهیاری" },
    { path: "مبلغ سایر سپرده های حقوقی", label: "مبلغ سایر سپرده های حقوقی" },
    { path: "تعداد سایر سپرده های حقوقی", label: "تعداد سایر سپرده های حقوقی" },
  ];
  columns = [
    { path: "Date", label: "تاریخ" },
    { path: "Count", label: "تعداد" },
    {
      path: "مبلغ سایر سپرده های حقوقی",
      label: "مبلغ سایر سپرده های حقوقی",
      type: "text",
      seprated: true,
    },
    {
      path: "تعداد سایر سپرده های حقوقی",
      label: "تعداد سایر سپرده های حقوقی",
      type: "text",
      seprated: true,
    },
    {
      path: "مبلغ سپرده  دهیاری",
      label: "مبلغ سپرده  دهیاری",
      type: "text",
      seprated: true,
    },
    {
      path: "تعداد سپرده دهیاری",
      label: "تعداد سپرده دهیاری",
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
          name={`منابع دهیاری ${item.Date}`}
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

export default BajeDehyariUploadTable;
