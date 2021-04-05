import React, { Component } from "react";
import SupervisorsRankTable from "./supervisorsRankTable";
import { getSupervisorsRank } from "../services/supervisorsRank";
import _ from "lodash";
class Rank extends Component {
  state = {
    data: [],
    title: "جدول فراوانی امتیاز تعدیل شده شعب",
  };
  async componentDidMount() {
    this.refresh();
  }
  refresh = async () => {
    const { data } = await getSupervisorsRank(
      this.props.ratio,
      this.props.paydate
    );
    this.setState({ data });
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <SupervisorsRankTable
            data={this.state.data}
            title={this.state.title}
          />
        </div>
      </div>
    );
  }
}

export default Rank;
