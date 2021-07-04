import React, { Component } from "react";
import RelocationTable from "./relocationTable";
import {
  getRelocateRequest,
  CommitRelocateRequest,
} from "../services/relocation";
class Relocation extends Component {
  state = {
    data: [],
    title: "جدول درخواست جابجایی",
  };

  componentDidMount() {
    this.refresh();
  }
  refresh = async () => {
    if (!this.props.paydate) return false;
    const { data } = await getRelocateRequest(
      this.props.paydate,
      this.props.NationalCode
    );
    this.setState({ data });
  };

  onCommit = async (id) => {
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
