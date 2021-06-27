import React, { Component } from "react";
import PersonsListTable from "./personsListTable";
import { KaranehPersonelReport } from "../services/product";
class KaranehPersonelReport extends Component {
  state = {
    width: 0,
    height: 0,
    pageContent: { title: "گزارش کارانه پرداختی" },
    data: [],
  };
  componentDidMount() {
    this.fillData();
  }
  fillData = async () => {
    const { data } = await KaranehPersonelReport(
      this.props.employee.NationalCode
    );
    this.setState({ data });
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
                  <div className="brand-wrapper ">
                    <PersonsListTable
                      data={this.state.data}
                      title={this.state.pageContent.title}
                    />
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

export default KaranehPersonelReport;
