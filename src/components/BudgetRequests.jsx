import React, { Component } from "react";
import { BudgetNewRequests } from "../services/budget";
import { Link } from "react-router-dom";
class BudgetRequests extends Component {
  state = {
    pageContent: { title: "آخرین درخواستهای بودجه" },
    selectedRequestId: new URLSearchParams(window.location.search).get("id"),
    BudgetRequests: [],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.getBudgetNewRequests();
  }
  getBudgetNewRequests = async () => {
    const { data } = await BudgetNewRequests();
    this.setState({ BudgetRequests: data });
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
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">نام واحد</th>
                        <th scope="col">کد واحد</th>
                        <th scope="col">تعداد درخواست</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.BudgetRequests.map((r, i) => {
                        return (
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{r.Title}</td>
                            <td>{r.Code}</td>
                            <td>{r.Count}</td>
                            <td>
                              <Link
                                to={`/budgetrcommit/?Id=${r.Code}`}
                                className="d-inline  btn btn-outline-success btn-sm m-1"
                              >
                                نمایش
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
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

export default BudgetRequests;
