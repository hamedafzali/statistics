import React, { Component } from "react";
import KaranehManagerTable from "./karanehManagersTable";
import { getManagersList } from "../services/personsKaraneh";
//import _ from "lodash";
import { ManagersKaranehInsert } from "../services/personsKaraneh";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class KaranehManagers extends Component {
  state = {
    managersList: [],
    currentPage: 1,
    pageSize: 30,
    sortColumn: { path: "Rank", order: "asc" },
  };

  componentDidMount() {
    this.refresh();
  }
  onCommit = async (NationalCode, Amount) => {
    //console.log("mmmm", NationalCode, Amount);
    const { data } = await ManagersKaranehInsert(
      NationalCode,
      "139912",
      Amount
    );
    //console.log(data[0]);
    if (!data[0]) this.showMessage("خطا در ثبت اطلاعات", "error");
    else this.showMessage("اطلاعت ثبت شد", "success");
    //this.refresh();
  };
  tbhandleChange = (data) => {
    this.setState({ data });
  };
  refresh = async () => {
    const { data: managersList } = await getManagersList("139912");
    this.setState({ managersList });
  };

  showMessage = (msg, type) => {
    toast[type](msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer className="text-center" />
        <KaranehManagerTable
          data={this.state.managersList}
          onCommit={this.onCommit}
          tbhandleChange={this.tbhandleChange}
        />
      </React.Fragment>
    );
  }
}

export default KaranehManagers;
