import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import InputPrepend from "./common/inputPrepend";
import { BudgetGetData } from "../services/budget";
import SelectSearchable from "./common/selectSearchable";
import Select from "./common/selectPrepend";
class BudgetTotalReg extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "ثبت بودجه کل ابلاغ شده" },
    titleData: [],
    Dates: [{ id: 1400, name: 1400 }],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    //this.fillGrid();
    this.getBudgetGetData();
  }
  handleChange = (e) => {
    //alert(e.currentTarget.name);
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
    //console.log(this.state);
  };
  handleSelectChange = (row) => {
    //console.log(row);
    const newState = { ...this.state };
    newState.budgetTitle = row.Title;
    newState.accountCode = row.Code;
    newState.selectedOption = row;
    this.setState(newState);
  };

  fillGrid = async () => {
    const { data: titleData } = await BudgetGetData();
    this.setState({ titleData });
  };
  getBudgetGetData = async () => {
    const { data: BudgetData } = await BudgetGetData();
    this.setState({ BudgetData });
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
                    <div className="row">
                      <div className=" col-lg-12 col-md-12 mt-1">
                        <SelectSearchable
                          name="accountCode"
                          data={this.state.BudgetData}
                          onChange={this.handleSelectChange}
                          selectedValue={this.state.selectedOption}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col-lg-4 col-md-12 mt-1">
                        <Select
                          onChange={this.handleChange}
                          name="paydate"
                          label="بودجه سال"
                          error=""
                          options={this.state.Dates}
                        />
                      </div>

                      <div className=" col-lg-4 col-md-12 mt-1">
                        <InputPrepend
                          type="text"
                          name="code"
                          id="code"
                          label="مبلغ ابلاغ شده"
                          error=""
                          placeholder=""
                          value={this.state.code}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className=" col-lg-4 col-md-12 mt-2">
                        <div
                          className="  btn btn-outline-danger btn m2 btn-block"
                          onClick={this.handleSave}
                        >
                          ذخیره
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <table
                          className="table table-striped border text-center"
                          style={{ textAlign: "center" }}
                        >
                          <thead>
                            <tr>
                              <th scope="col">سال</th>
                              <th scope="col">نام سرفصل</th>
                              <th scope="col">کد سرفصل</th>
                              <th scope="col">مبلغ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.titleData.map((i) => (
                              <tr>
                                <td>{i.Title}</td>
                                <td>{i.Code}</td>
                                <td>{i.Title}</td>
                                <td>{i.Code}</td>
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

export default BudgetTotalReg;
