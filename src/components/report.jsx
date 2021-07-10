import React, { Component } from "react";
import ReportTable from "./reportTable";
import { getPersonReport } from "../services/persons";
import _ from "lodash";
import { paginate } from "../utils/paginate";
class Report extends Component {
  state = {
    PersonReport: [],
    currentPage: 1,
    pageSize: 500,
    sortColumn: { path: "Rank", order: "asc" },
    employees: [],
  };

  componentDidMount() {
    this.setState({ employees: this.props.employees }, () => {
      console.log(this.state.employees);
      this.refresh();
    });
  }
  refresh = async () => {
    const { data: PersonReport } = await getPersonReport(
      this.state.employees[this.state.employees.length - 1].NationalCode
    );
    //console.log(PersonReport);
    this.setState({ PersonReport });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, PersonReport } = this.state;

    //const filtered = Ranks;

    const sorted = _.orderBy(
      PersonReport,
      [sortColumn.path],
      [sortColumn.order]
    );
    const P = paginate(sorted, currentPage, pageSize);
    return { totalCount: PersonReport.length, data: P };
  };

  render() {
    const { length: count } = this.state.PersonReport;

    if (count === 0) return <p>اطلاعاتی وجود ندارد.</p>;

    const { data } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <ReportTable
            data={data}
            allData={this.state.PersonReport}
            title={"پرسنل زیر مجموعه"}
          />
        </div>
      </div>
    );
  }
}

export default Report;
