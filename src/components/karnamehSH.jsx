import React, { Component } from "react";
import KarnamehSHTable from "./karnamehSHTable";
import { getKarnamehSH } from "../services/karnameh";
//import _ from "lodash";
class Karnameh extends Component {
  state = {
    data: [],
    title: "کارنامه تجمعی شعب",
    height: 600,
  };
  refresh = async (type) => {
    const { data } = await getKarnamehSH(this.props.paydate);
    this.setState({ data });
  };
  render() {
    const { height, data, title } = this.state;
    return <KarnamehSHTable data={data} title={title} height={height} />;
  }
}

export default Karnameh;
