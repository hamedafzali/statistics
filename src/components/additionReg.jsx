import React, { Component } from "react";
import AdditionRegTable from "./additionRegTable";
import Pagination from "./common/pagination";
import { PersonAdditiongetAllData } from "../services/persons";
import _ from "lodash";
import { paginate } from "../utils/paginate";
class AdditionReg extends Component {
  state = {
    PersonAddition: [],
    currentPage: 1,
    pageSize: 500,
    sortColumn: { path: "Rank", order: "asc" },
  };

  async componentDidMount() {
    this.refresh();
  }
  refresh = async () => {
    //console.log(this.props);
    const { data: PersonAddition } = await PersonAdditiongetAllData(
      this.props.paydate,
      2
    );
    //console.log(PersonReport);
    this.setState({ PersonAddition });
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
    const { pageSize, currentPage, sortColumn, PersonAddition } = this.state;

    //const filtered = Ranks;

    const sorted = _.orderBy(
      PersonAddition,
      [sortColumn.path],
      [sortColumn.order]
    );
    const P = paginate(sorted, currentPage, pageSize);
    return { totalCount: PersonAddition.length, data: P };
  };

  render() {
    const { length: count } = this.state.PersonAddition;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>اطلاعاتی وجود ندارد.</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <span className="input-group-text text-justifiy col-md">
            پرسنل - تعداد: {totalCount}
          </span>

          <AdditionRegTable
            data={data}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
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

export default AdditionReg;
