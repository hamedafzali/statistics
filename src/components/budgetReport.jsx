import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { budgetInsert, BudgetDocumentGetData } from "../services/budget";

class BudgetReport extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "گزارش بودجه" },
    BudgetDocuments: [],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    //this.fillGrid();
    this.getBudgetDocuments();
  }
  handleChange = (e) => {
    //alert(e.currentTarget.name);
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
    //console.log(this.state);
  };
  getBudgetDocuments = async () => {
    const { data: BudgetDocuments } = await BudgetDocumentGetData(
      this.props.employee.NationalCode
    );
    this.setState({ BudgetDocuments });
  };
  handleSave = async () => {
    // if (this.state.documentTypeId === 0) {
    //   this.showMessage("نوع سند انتخاب نشده است", "error");
    //   return false;
    // } else if (this.state.documentTitle.length === 0) {
    //   this.showMessage("عنوان سند را وارد کنید", "error");
    //   return false;
    // } else if (this.state.unitId === 0) {
    //   this.showMessage("واحد مقصد انتخاب نشده است", "error");
    //   return false;
    // }
    const { data } = await budgetInsert({
      title: this.state.title,
      code: this.state.code,
    });

    if (!data) {
      this.showMessage("نوع سند انتخاب نشده است", "error");
      return false;
    } else {
      this.showMessage("سند ثبت شد", "success");
      this.fillGrid();
      this.setState({ title: "", code: "" });
    }
  };

  showMessage = (msg, type) => {
    toast[type](msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  render() {
    return (
      <main className="d-flex align-items-center  py-md-0  ">
        <ToastContainer className="text-center" />
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
                  <div className="brand-wrapper ">
                    {/* <div className="row">
                      <div className=" col-lg-6 col-md-12 mt-1">
                        <InputPrepend
                          type="text"
                          name="title"
                          id="title"
                          label="عنوان سرفصل بودجه"
                          error=""
                          placeholder=""
                          value={this.state.title}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className=" col-lg-4 col-md-12 mt-1">
                        <InputPrepend
                          type="text"
                          name="code"
                          id="code"
                          label="کد سرفصل بودجه"
                          error=""
                          placeholder=""
                          value={this.state.code}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className=" col-lg-2 col-md-12 mt-2">
                        <div
                          className="  btn btn-outline-danger btn m2 btn-block"
                          onClick={this.handleSave}
                        >
                          ذخیره
                        </div>
                      </div>
                    </div> */}
                    <div className="row">
                      <div className="col col-12">
                        <table
                          className="table table-striped "
                          style={{
                            width: "100%",
                            fontSize: 14,
                          }}
                        >
                          <thead className="thead-dark">
                            <tr key="header">
                              <th scope="col">تاریخ ثبت</th>
                              <th scope="col">شماره سند</th>
                              <th scope="col">نوع سند</th>
                              <th scope="col">عنوان سند</th>
                              <th scope="col">واحد مقصد</th>
                              <th scope="col">ثبت کننده</th>
                              <th scope="col">تایید اول</th>
                              <th scope="col">تایید دوم</th>
                              <th scope="col">تایید نهایی</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.BudgetDocuments.map((i) => (
                              <tr key={i.Id}>
                                <td>{i.Date}</td>
                                <td>{i.Id}</td>
                                <td>{i.DocumentType}</td>
                                <td>{i.Title}</td>
                                <td>{i.Branch + "-" + i.BranchCode}</td>
                                <td>{i.Registrar}</td>
                                <td>{i.Commit1}</td>
                                <td>{i.Commit2}</td>
                                <td>{i.Commit3}</td>
                                <td>
                                  <div
                                    className="d-inline  btn btn-outline-danger btn-md m1"
                                    onClick={() => {
                                      this.setState({
                                        selectedDocumentId: i.Id,
                                      });
                                    }}
                                  >
                                    چاپ
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
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default BudgetReport;
