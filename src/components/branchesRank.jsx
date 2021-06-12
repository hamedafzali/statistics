import React, { Component } from "react";
import BranchesRankTable from "./branchesRankTable";
//import Pagination from "./common/pagination";
//import InputRange from "react-input-range";
import { getBranchesRank } from "../services/branchesRank";
import "react-input-range/lib/css/index.css";
//import _ from "lodash";
//import { paginate } from "../utils/paginate";
class BranchesRank extends Component {
  state = {
    loading: false,
    data: [],
    title: "گزارش محاسباتی",
    height: 600,
  };

  // componentDidMount() {
  //   this.refresh();
  // }
  refresh = async () => {
    this.setState({ loading: true });
    const { data } = await getBranchesRank(
      this.props.ratio,
      this.props.paydate
    );

    //console.log("BranchesRank", BranchesRank);
    this.setState({ data, loading: false });
  };

  render() {
    const { data, title, height } = this.state;
    return (
      <BranchesRankTable
        data={data}
        title={title}
        height={height}
        loading={this.state.loading}
      />
    );
  }
}

export default BranchesRank;
