import React, { Component } from "react";
//import img109004 from "../assets/images/109004.jpg";
import { getAllUnits } from "../services/messages";
import { Link } from "react-router-dom";
class MessageNew extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "ایجاد پیام جدید" },
    units: [
      {
        Supervisor: "اداره کل آمار و بودجه",
        SupervisorCode: "M8001",
        Name: "شهنام",
        Family: "زندیه",
      },
      {
        Supervisor: "اداره کل برنامه ریزی و کنترل برنامه ها",
        SupervisorCode: "T8001",
        Name: "محمدرضا",
        Family: "حسنلو",
      },
    ],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    //this.getUnits();
  }

  getUnits = async () => {
    const { data } = await getAllUnits();
    //console.log("units", data);
    this.setState({
      units: data,
    });
  };
  handleBarClick(element, id) {
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  }

  render() {
    // const configs = {
    //   animate: true,
    //   // focusOutline: false,
    //   clickDismiss: false,
    //   escapeDismiss: false,
    // };
    //const margin = { top: 20, right: 20, bottom: 30, left: 40 };

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
                  class="row"
                  style={{
                    width: "98%",
                  }}
                >
                  {this.state.units.map((row) => (
                    <div class="col-md-6 col-lg-3 col-sm-6 col-xs-12 ">
                      <div
                        className="card btn btn-light text-dark"
                        style={{
                          margin: "0.5rem",
                          borderRadius: "1rem",
                          boxShadow: "5px 5px 5px grey",
                          //width: 200,
                          height: 150,
                        }}
                      >
                        {/* <img
                          className="card-img-top"
                          src="img/card1.jpg"
                          alt="Card image cap"
                        /> */}
                        <div className="card-block">
                          <strong className="card-title m-2 text-nowrap">
                            {row.Supervisor}
                          </strong>
                          <p className="card-text mt-3">
                            مدیریت:{row.Name + " " + row.Family}
                          </p>
                          <Link
                            to={"/messages/" + row.SupervisorCode}
                            className="btn btn-outline-success btn-sm block "
                          >
                            ارسال پیام
                          </Link>
                        </div>
                      </div>
                    </div>
                    // <div
                    //   className="col col-3 border border-secondary btn btn-light"
                    //   style={{
                    //     margin: "0.8rem",
                    //     borderRadius: "1rem",
                    //     boxShadow: "5px 5px 5px grey",
                    //     width: 300,
                    //     height: 150,
                    //   }}
                    // >
                    //   {/* <img
                    //     src={require("../assets/images/109004.jpg")}
                    //     class="card-img-top"
                    //     alt="..."
                    //   /> */}

                    //   <h5 className="card-title">{row.Supervisor}</h5>
                    //   <h6 className="card-subtitle">{row.SupervisorCode}</h6>
                    //   <p className="card-text">
                    //     مدیریت:{row.Name + " " + row.Family}
                    //   </p>
                    //   <Link
                    //     to={"/messages/" + row.SupervisorCode}
                    //     className="btn btn-outline-success block"
                    //   >
                    //     ارسال پیام
                    //   </Link>
                    // </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default MessageNew;
