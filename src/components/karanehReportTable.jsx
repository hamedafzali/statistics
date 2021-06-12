import React, { Component } from "react";
import Table from "./common/table";

class KarnamehReportPersonTable extends Component {
  state = { fs: 10 };
  columns = [
    { path: "سرپرستی", label: "سرپرستی" },
    //{ path: "کد سرپرستی", label: "کد سرپرستی" },
    { path: "شعبه", label: "شعبه" },
    //{ path: "کد شعبه", label: "کد شعبه" },
    { path: "نام", label: "نام" },
    { path: "نام خانوادگی", label: "نام خانوادگی" },
    { path: "کد ملی", label: "کد ملی" },
    //{ path: "ضریب", label: "ضریب" },
    //{ path: "حد پایین", label: "حد پایین" },
    //{ path: "حد بالا", label: "حد بالا" },
    //{ path: "درجه", label: "درجه" },
    //{ path: "تعداد پرسنل", label: "تعداد پرسنل" },
    //{ path: "کارنامه طرح پویش تجمعی 99", label: "ماهانه" },
    //{ path: "کارنامه طرح پویش ماهانه 99", label: "با اعمال حد" },
    { path: "محاسبه امتیاز تلفیقی", label: "امتیاز تلفیقی" },
    { path: "مبلغ محاسباتی", label: "مبلغ محاسباتی" },
    {
      path: "محاسبه امتیاز مکتسبه بااعمال حد",
      label: "امتیاز  بااعمال حد",
    },
    { path: "مبلغ محاسباتی با اعمال حد", label: "مبلغ  با اعمال حد" },
    { path: "امتیاز با حد و ضریب بودجه", label: "امتیاز با حد و ضریب بودجه" },
    {
      path: "مبلغ محاسباتی با اعمال حد و ضریب بودجه",
      label: "مبلغ  با اعمال حد و ضریب بودجه",
    },
    { path: "کارگزاری", label: "کارگزاری" },
    //{ path: "کارگزاری-ساعت", label: "کارگزاری-ساعت" },
    { path: "ارزی", label: "ارزی" },
    //{ path: "ارزی-ساعت", label: "ارزی-ساعت" },
    { path: "مبلغ ثابت", label: "مبلغ ثابت" },
    { path: "سهم شعبه", label: "سهم شعبه" },
    { path: "سهم سرپرستی/ستاد", label: "سهم سرپرستی/ستاد" },
    { path: "PayDate", label: "تاریخ پرداخت" },
  ];

  render() {
    const { data, height, title, loading } = this.props;

    return (
      <Table
        columns={this.columns}
        data={data}
        height={height}
        title={title}
        loading={loading}
      />
    );
  }
}
class KarnamehReportBranchTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "سرپرستی", label: "سرپرستی" },
    //{ path: "کد سرپرستی", label: "کد سرپرستی" },
    { path: "شعبه", label: "شعبه" },
    //{ path: "کد شعبه", label: "کد شعبه" },
    { path: "ضریب", label: "ضریب" },
    //{ path: "حد پایین", label: "حد پایین" },
    //{ path: "حد بالا", label: "حد بالا" },
    { path: "درجه", label: "درجه" },
    { path: "تعداد پرسنل", label: "تعداد پرسنل" },
    //{ path: "کارنامه طرح پویش تجمعی 99", label: "ماهانه" },
    //{ path: "کارنامه طرح پویش ماهانه 99", label: "با اعمال حد" },
    { path: "محاسبه امتیاز تلفیقی", label: "تلفیقی" },
    { path: "مبلغ محاسباتی", label: "مبلغ محاسباتی" },
    {
      path: "محاسبه امتیاز مکتسبه بااعمال حد",
      label: " امتیاز  بااعمال حد",
    },
    { path: "مبلغ محاسباتی با اعمال حد", label: "مبلغ  با اعمال حد" },
    { path: "امتیاز با حد و ضریب بودجه", label: "امتیاز با حد و ضریب بودجه" },
    {
      path: "مبلغ محاسباتی با اعمال حد و ضریب بودجه",
      label: "مبلغ  با اعمال حد و ضریب بودجه",
    },
    { path: "کارگزاری", label: "کارگزاری" },
    //{ path: "کارگزاری-ساعت", label: "کارگزاری-ساعت" },
    { path: "ارزی", label: "ارزی" },
    //{ path: "ارزی-ساعت", label: "ارزی-ساعت" },
    { path: "مبلغ ثابت", label: "مبلغ ثابت" },
    { path: "سهم شعبه", label: "سهم شعبه" },
    { path: "سهم سرپرستی/ستاد", label: "سهم سرپرستی/ستاد" },
    { path: "PayDate", label: "تاریخ پرداخت" },
  ];

  render() {
    const { data, height, title, loading } = this.props;

    return (
      <Table
        loading={loading}
        columns={this.columns}
        data={data}
        height={height}
        title={title}
      />
    );
  }
}
class KarnamehReportSupervisorTable extends Component {
  state = { fs: 14 };
  columns = [
    { path: "سرپرستی", label: "سرپرستی" },
    { path: "کد سرپرستی", label: "کد سرپرستی" },
    //{ path: "شعبه", label: "شعبه" },
    //{ path: "کد شعبه", label: "کد شعبه" },
    //{ path: "ضریب", label: "ضریب" },
    //{ path: "حد پایین", label: "حد پایین" },
    //{ path: "حد بالا", label: "حد بالا" },
    //{ path: "درجه", label: "درجه" },
    { path: "تعداد پرسنل", label: "تعداد پرسنل" },
    //{ path: "کارنامه طرح پویش تجمعی 99", label: "ماهانه" },
    //{ path: "کارنامه طرح پویش ماهانه 99", label: "با اعمال حد" },
    { path: "محاسبه امتیاز تلفیقی", label: "تلفیقی" },
    { path: "مبلغ محاسباتی", label: "مبلغ محاسباتی" },
    {
      path: "محاسبه امتیاز مکتسبه بااعمال حد",
      label: " امتیاز  بااعمال حد",
    },
    { path: "مبلغ محاسباتی با اعمال حد", label: "مبلغ  با اعمال حد" },
    { path: "امتیاز با حد و ضریب بودجه", label: "امتیاز با حد و ضریب بودجه" },
    {
      path: "مبلغ محاسباتی با اعمال حد و ضریب بودجه",
      label: "مبلغ  با اعمال حد و ضریب بودجه",
    },
    { path: "کارگزاری", label: "کارگزاری" },
    //{ path: "کارگزاری-ساعت", label: "کارگزاری-ساعت" },
    { path: "ارزی", label: "ارزی" },
    //{ path: "ارزی-ساعت", label: "ارزی-ساعت" },
    { path: "مبلغ ثابت", label: "مبلغ ثابت" },
    { path: "سهم شعبه", label: "سهم شعبه" },
    { path: "سهم سرپرستی/ستاد", label: "سهم سرپرستی/ستاد" },
    { path: "PayDate", label: "تاریخ پرداخت" },
  ];

  render() {
    const { data, height, title, loading } = this.props;

    return (
      <Table
        columns={this.columns}
        data={data}
        height={height}
        title={title}
        loading={loading}
      />
    );
  }
}
export {
  KarnamehReportPersonTable,
  KarnamehReportBranchTable,
  KarnamehReportSupervisorTable,
};
