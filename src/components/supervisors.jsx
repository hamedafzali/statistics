import React, { Component } from "react";
import SupervisorTable from "./supervisorTable";
import Pagination from "./common/pagination";
import { getSupervisors } from "../services/supervisors";
import _ from "lodash";
import { paginate } from "../utils/paginate";
class Supervisor extends Component {
  state = {
    Supervisors: [],
    currentPage: 1,
    pageSize: 6,
    sortColumn: { path: "Title", order: "asc" },
  };

  async componentDidMount() {
    const { data: Supervisors } = await getSupervisors();
    //console.log(Supervisors);
    this.setState({ Supervisors });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
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
    const { pageSize, currentPage, sortColumn, Supervisors } = this.state;

    //const filtered = Supervisors;

    const sorted = _.orderBy(
      Supervisors,
      [sortColumn.path],
      [sortColumn.order]
    );
    const PSupervisors = paginate(sorted, currentPage, pageSize);
    return { totalCount: Supervisors.length, data: PSupervisors };
  };

  render() {
    const { length: count } = this.state.Supervisors;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          {/* <p>Showing {totalCount} movies in the database.</p> */}
          <SupervisorTable
            movies={movies}
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

export default Supervisor;
