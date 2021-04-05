import React, { Component } from "react";
import CEOConfirmTable from "./ceoConfirmTable";
import { getPersonsKaraneh } from "../services/personsKaraneh";
//import _ from "lodash";
class CEOConfirm extends Component {
  state = {
    pageContent: { title: "تخصیص فوق العاده عملیاتی" },
    data: [],
    karanehRemain: [],
    sum: 0,
    title: "لیست کارانه",
  };

  componentDidMount() {
    this.refresh();
  }

  refresh = async () => {
    const { data } = await getPersonsKaraneh("2970677237", "139910");
    this.setState({ data });
  };
  numberWithCommas = (x) => {
    var nf = new Intl.NumberFormat();
    return nf.format(x); // "1,234,567,890"
  };

  render() {
    return (
      <main className="d-flex align-items-center  py-md-0  ">
        <div className="container ">
          <div className="card login-card ">
            <div className="row no-gutters">
              <div className="col-md">
                <div className="card-title btn-secondary">
                  <h4>{this.state.pageContent.title}</h4>
                </div>
                <div
                  className="card-body "
                  style={{ minHeight: this.state.height }}
                >
                  <CEOConfirmTable
                    data={this.state.data}
                    title={this.state.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default CEOConfirm;
