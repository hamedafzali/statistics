import React, { Component } from "react";
import { GetKaranehSummary } from "../services/karanehData";
import KaranehSummaryReportTable from "./KaranehSummaryReportTable";
//import CollapsibleTable from "./common/collapsibleTable";
class KaranehSummaryReport extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "صفحه اصلی" },
    KaranehSummary: [],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.fillGrid();
  }
  fillGrid = async () => {
    const { data: KaranehSummary } = await GetKaranehSummary(
      this.props.employee.BranchCode
    );
    this.setState({ KaranehSummary }, () => console.log(this.state));
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
                  <KaranehSummaryReportTable
                    data={this.state.KaranehSummary}
                    title={"لیست پرداختی پرسنل سال 1400"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default KaranehSummaryReport;
