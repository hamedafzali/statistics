import React, { Component } from "react";
import { BudgetRDocumentDetailGetData } from "../services/budget";
class BudgetRequestToDocument extends Component {
  state = {
    pageContent: { title: "صدور سند" },
    selectedRequestId: new URLSearchParams(window.location.search).get("Id"),
    BudgetRDocumentDetail: [],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    //this.handleBudgetUnits();
    this.getBudgetRDocumentDetail();
  }
  getBudgetRDocumentDetail = async () => {
    const { data: BudgetRDocumentDetail } = await BudgetRDocumentDetailGetData(
      this.state.selectedRequestId
    );
    this.setState({ BudgetRDocumentDetail });
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
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr key="header">
                        <th scope="col">شماره سند</th>
                        {/* <th scope="col">کد سرفصل</th>
                                      <th scope="col">عنوان سرفصل</th> */}
                        <th scope="col">مبلغ</th>
                        <th scope="col">شرح سند</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.BudgetRDocumentDetail.map((i) => (
                        <tr key={i.PId}>
                          <td>{i.PId}</td>
                          {/* <td>{i.Code}</td>
                                          <td>{i.Title}</td> */}
                          <td>{i.Amount}</td>
                          <td>{i.Description}</td>
                          <td>
                            <div
                              className=" btn btn-outline-warning btn-sm m-1"
                              onClick={() =>
                                this.setState(
                                  {
                                    accountCode: i.Code,
                                    amount: i.Amount,
                                    description: i.Description,
                                    documentDetailId: i.Id,
                                  },
                                  () => {
                                    this.handleBudgetTitle();
                                  }
                                )
                              }
                            >
                              ویرایش
                            </div>
                            <div
                              className="  btn btn-outline-danger btn-sm m-1 "
                              onClick={
                                () =>
                                  window.confirm(
                                    `آیا از حذف این ردیف مطمئن هستید؟`
                                  ) === true
                                    ? this.handleBudgetDetailDelete(i.Id)
                                    : null
                                // this.handleBudgetDetailDelete(
                                //   i.Id
                                // )
                              }
                            >
                              حذف
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
