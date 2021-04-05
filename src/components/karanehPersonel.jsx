import React, { Component } from "react";
import KaranehPersonelTable from "./karanehPersonelTable";
import Pagination from "./common/pagination";
import { getPersonelKaraneh } from "../services/personsKaraneh";
import _ from "lodash";
import { paginate } from "../utils/paginate";
class KaranehPersonel extends Component {
  state = {
    KaranehPersonel: [],
    currentPage: 1,
    pageSize: 500,
    sortColumn: { path: "Supervisor", order: "asc" },
  };

  async componentDidMount() {
    //this.refresh();
    //console.log(this.props);
    //this.setState({ karnameh });
  }
  refresh = async (type) => {
    const { data: KaranehPersonel } = await getPersonelKaraneh(
      this.props.paydate,
      this.props.ratiosaf,
      this.props.ratiosetad,
      this.props.ratio
    );
    this.setState({ KaranehPersonel });

    //console.log(this.state);

    //console.log("BranchesRank", BranchesRank);
    //this.setState({ branchesRank });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, KaranehPersonel } = this.state;
    //const filtered = branchesRank;

    const sorted = _.orderBy(
      KaranehPersonel,
      [sortColumn.path],
      [sortColumn.order]
    );
    const Pdata = paginate(sorted, currentPage, pageSize);
    return { totalCount: KaranehPersonel.length, data: Pdata };
  };

  render() {
    const { length: count } = this.state.KaranehPersonel;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>اطلاعاتی وجود ندارد.</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <span className="input-group-text text-justifiy col-md">
            لیست پرسنل {totalCount}
          </span>

          <KaranehPersonelTable
            data={data}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            allData={this.state.KaranehPersonel}
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

export default KaranehPersonel;
