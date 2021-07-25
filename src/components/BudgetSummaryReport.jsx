import React, { Component } from "react";
import BudgetSummaryReportTable from "./BudgetSummaryReportTable";
import { BudgetSummary } from "../services/budget";
class BudgetSummaryReport extends Component {
  state = {
    data: [],
    title: "گزارش خلاصه وضعیت مانده اعتبارات جاری",
  };

  componentDidMount() {
    this.getBudgetSummary();
  }
  getBudgetSummary = async () => {
    const { data } = await BudgetSummary();
    this.setState({ data });
  };

  render() {
    return (
      <main className="d-flex align-items-center  py-md-0  ">
        <div className="container ">
          <div className="card login-card ">
            <div className="brand-wrapper px-4 pt-2">
              <BudgetSummaryReportTable
                data={this.state.data}
                title={this.state.title}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default BudgetSummaryReport;
