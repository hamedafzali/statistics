import React, { Component } from "react";
import KarnamehOTable from "./karnamehOTable";
import { getKarnamehO } from "../services/karnameh";
//import _ from "lodash";
class Karnameh extends Component {
  state = {
    data: [],
    title: "کارنامه تجمعی استان",
    height: 600,
  };
  refresh = async (type) => {
    const { data } = await getKarnamehO(this.props.paydate);
    this.setState({ data });
  };
  render() {
    const { height, data, title } = this.state;
    return <KarnamehOTable data={data} title={title} height={height} />;
  }
}
export default Karnameh;
