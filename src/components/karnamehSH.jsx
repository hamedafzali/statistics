import React, { Component } from "react";
import KarnamehSHTable from "./karnamehSHTable";
import { getKarnamehSH } from "../services/karnameh";
//import _ from "lodash";
class Karnameh extends Component {
  state = {
    loading: false,
    data: [],
    title: "کارنامه تجمعی شعب",
    height: 600,
  };
  refresh = async (type) => {
    this.setState({ loading: true });
    const { data } = await getKarnamehSH(this.props.paydate);
    this.setState({ data, loading: false });
  };
  render() {
    const { height, data, title, loading } = this.state;
    return (
      <KarnamehSHTable
        data={data}
        title={title}
        height={height}
        loading={loading}
      />
    );
  }
}

export default Karnameh;
