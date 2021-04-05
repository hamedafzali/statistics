import React, { Component } from "react";
import RelocationTable from "./relocationTable";
import {
  getRelocateRequest,
  CommitRelocateRequest,
} from "../services/relocation";
//import _ from "lodash";
class Relocation extends Component {
  state = {
    data: [],
    title: "جدول درخواست جابجایی",
  };

  componentDidMount() {
    this.refresh();
  }
  refresh = async () => {
    console.log(this.props.paydate, this.props.NationalCode);
    const { data } = await getRelocateRequest(
      this.props.paydate,
      this.props.NationalCode
    );

    //console.log(Ranks);
    this.setState({ data });
  };

  onCommit = async (id) => {
    //console.log(id, this.props);
    await CommitRelocateRequest(id, this.props.NationalCode);
    this.refresh();
  };

  render() {
    return (
      <RelocationTable
        data={this.state.data}
        title={this.state.title}
        onCommit={this.onCommit}
      />
    );
  }
}

export default Relocation;
