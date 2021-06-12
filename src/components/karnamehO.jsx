import React, { Component } from "react";
import KarnamehOTable from "./karnamehOTable";
import { getKarnamehO } from "../services/karnameh";
//import _ from "lodash";
class Karnameh extends Component {
  state = {
    loading: false,
    data: [],
    title: "کارنامه تجمعی استان",
    height: 600,
  };
  refresh = async () => {
    this.setState({ loading: true });
    const { data } = await getKarnamehO(this.props.paydate);
    this.setState({ data, loading: false });
  };
  render() {
    const { height, data, title, loading } = this.state;
    return (
      <KarnamehOTable
        data={data}
        title={title}
        height={height}
        loading={loading}
      />
    );
  }
}
export default Karnameh;
