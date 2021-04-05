import React, { Component } from "react";
import AdditionTable from "./additionTable";
import { getAddition } from "../services/addition";
//import _ from "lodash";
class Addition extends Component {
  state = {
    data: [],
    title: "فوق العاده خاص",
  };

  componentDidMount() {
    this.refresh();
  }
  refresh = async () => {
    const { data } = await getAddition(this.props.paydate);
    this.setState({ data });
  };

  render() {
    return <AdditionTable data={this.state.data} title={this.state.title} />;
  }
}

export default Addition;
