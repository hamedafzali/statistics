import React, { Component } from "react";
import { BudgetRDocumentDetailGetData } from "../services/budget";
import SelectSearchable from "./common/selectSearchable";
import { BudgetGetDataWithCode } from "../services/budget";
import Select from "./common/select";
import Input from "./common/input";
class BudgetRequestToDocument extends Component {
  state = {
    pageContent: { title: "صدور سند" },
    selectedRequestId: new URLSearchParams(window.location.search).get("Id"),
    BudgetRDocumentDetail: [],
    selectedDocumentData: [],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    //this.handleBudgetUnits();
    this.getBudgetRDocumentDetail();
    this.getBudgetGetData();
  }
  getBudgetGetData = async () => {
    const { data: BudgetData } = await BudgetGetDataWithCode();
    this.setState({ BudgetData });
  };
  getBudgetRDocumentDetail = async () => {
    const { data: BudgetRDocumentDetail } = await BudgetRDocumentDetailGetData(
      this.state.selectedRequestId
    );
    this.setState({ BudgetRDocumentDetail }, () => console.log(this.state));
  };
  handleSelectChange = (row, i) => {
    console.log(
      "BudgetRDocumentDetailOld",
      this.state.BudgetRDocumentDetail,
      i,
      row
    );
    let oldBudgetRDocumentDetail = this.state.BudgetRDocumentDetail.map((r) => {
      if (r === i) {
        r.Code = row.value;
        r.Title = row.label;
        return r;
      } else return r;
    });

    this.setState({ BudgetRDocumentDetail: oldBudgetRDocumentDetail }, () =>
      console.log(this.state.BudgetRDocumentDetail[0].Code)
    );
  };
  render() {
    return (
      <main className="d-flex align-items-center  py-md-0  ">
        <div className="container ">
          <div className="card login-card ">
            <div className="row no-gutters">
              <div className="col-md">
                <div className="card-title btn-secondary">
                  <h4>{this.state.pageContent.title}</h4>
                </div>
                <div
                  className="card-body "
                  style={{ minHeight: this.state.height }}
                >
                  <div className="row border bg-light rounded">
                    <div className="col-md-12 col-lg-6">
                      <div className="row">
                        <div className="col">عنوان درخواست</div>
                        <div className="col">
                          {this.state.selectedDocumentData.length
                            ? this.state.selectedDocumentData[0].Title
                            : ""}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">تاریخ ثبت</div>
                        <div className="col">
                          {this.state.selectedDocumentData.length
                            ? this.state.selectedDocumentData[0].Date
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="row">
                        <div className="col">شماره درخواست</div>
                        <div className="col">
                          {this.state.selectedDocumentData.length
                            ? this.state.selectedDocumentData[0].Id
                            : ""}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">شماره پیگیری</div>
                        <div className="col">
                          {this.state.selectedDocumentData.length
                            ? this.state.selectedDocumentData[0].GUID
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xl-4">
                      <Select
                        onChange={this.handleChange}
                        name="documentTypeId"
                        label="نوع درخواست"
                        error=""
                        options={[
                          { id: 1, name: "جاری" },
                          {
                            id: 2,
                            name: "سرمایه ای",
                          },
                        ]}
                      />
                    </div>
                    <div className="col-md-12 col-xl-8">
                      <Input
                        type="text"
                        name="documentTitle"
                        id="documentTitle"
                        label="توضیحات "
                        error=""
                        title={this.props.employee.BranchCode}
                        maxLength={500}
                        placeholder=""
                        value={this.state.documentTitle}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr key="header">
                        <th scope="col">شماره درخواست</th>
                        <th scope="col">کد سرفصل</th>
                        <th scope="col">مبلغ</th>
                        <th scope="col">شرح سند</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.BudgetRDocumentDetail.map((i) => (
                        <tr key={i.PId}>
                          <td>{i.PId}</td>
                          <td width="40%">
                            <SelectSearchable
                              name="accountCode"
                              data={this.state.BudgetData}
                              onChange={(e) => this.handleSelectChange(e, i)}
                              selectedValue={
                                this.state.BudgetRDocumentDetail.filter(
                                  (r) => r.Code === i.Code
                                ).Code
                              }
                            />
                          </td>
                          <td>{i.Amount}</td>
                          <td>{i.Description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="btn btn-success btn-block">ثبت سند</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default BudgetRequestToDocument;
