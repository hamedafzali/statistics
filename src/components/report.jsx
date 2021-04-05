import React, { Component } from "react";
import ReportTable from "./reportTable";
import Pagination from "./common/pagination";
import { getPersonReport } from "../services/persons";
import _ from "lodash";
import { paginate } from "../utils/paginate";
class Report extends Component {
  state = {
    PersonReport: [],
    currentPage: 1,
    pageSize: 500,
    sortColumn: { path: "Rank", order: "asc" },
  };

  async componentDidMount() {
    this.refresh();
  }
  refresh = async () => {
    const { data: PersonReport } = await getPersonReport(
      this.props.employee.NationalCode
    );
    //console.log(PersonReport);
    this.setState({ PersonReport });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
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
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>اطلاعاتی وجود ندارد.</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <span className="input-group-text text-justifiy col-md">
            پرسنل - تعداد: {totalCount}
          </span>

          <ReportTable
            data={data}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            allData={this.state.PersonReport}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Report;
