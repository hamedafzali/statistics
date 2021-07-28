import React, { Component } from "react";
import logo from "../assets/images/Logo Amar without.png";
import { Link } from "react-router-dom";

//import CollapsibleTable from "./common/collapsibleTable";
class MainPage extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "صفحه اصلی" },
    sideMenu: [
      { name: "ایجاد پیام جدید", link: "/messagesNew" },
      { name: "پیامهای جدید", link: "/messages", badge: "4", color: "danger" },
      { name: "بخشنامه ها", link: "/" },
      {
        name: "کتابچه پایش و پویش",
        link: "/pdf",
      },
    ],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
  }
  handleBarClick(element, id) {
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  }
  handleMsg = (type) => {
    alert(type);
  };

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
                  className="card-body "
                  style={{ minHeight: this.state.height }}
                >
                  <div className="row mt-n5">
                    <div
                      className="col col-lg-3 col-sm-12 col-xs-12 bg-light "
                      style={{ borderRadius: 20 }}
                    >
                      <h5
                        className="bg-secondary text-white"
                        style={{ borderRadius: 20 }}
                      >
                        اطلاع رسانی
                      </h5>

                      {this.state.sideMenu.map((row) => (
                        <div key={row}>
                          <Link
                            to={row.link + "/" + row.name}
                            className=" btn btn-sm btn-light btn-block "
                          >
                            <h5 className="d-inline ">
                              {row.name}

                              <strong
                                className={
                                  row.color
                                    ? "mr-2 badge badge-" + row.color
                                    : "mr-2 badge badge-warning"
                                }
                              >
                                {row.badge}
                              </strong>
                            </h5>
                          </Link>
                          <hr className="mt-1 mb-1" />
                        </div>
                      ))}
                    </div>
                    <div className="col col-lg-9 col-sm-12 col-12 ">
                      <div className="brand-wrapper ">
                        <img src={logo} alt="" width="100" />
                        <br />
                        <br />

                        <h2 className="text-danger">
                          به سامانه آمار و بودجه خوش آمدید
                        </h2>
                        <hr className="mt-3 mb-3" />
                        <br />

                        <h4>
                          خواهشمند است با توجه به توسعه ، جهت استفاده صحیح از
                          سامانه،آخرین بخشنامه های آموزشی مرتبط که به صورت مستمر
                          در حال به روز رسانی می باشد را مطالعه فرمایند
                        </h4>
                        <br />
                        <h4>
                          همکاران ما پاسخگوی سوالات شما خواهند بود
                          <li>دفتر مدیریت : 81562025-021</li>
                          <li>معاون اداره کل: احسان امیری </li>
                          {/* <li>کارشناس موضوعی مجید محمدی پور : 81562022-021</li>
                      <li>کارشناس موضوعی لیلا نجاتی : 81562044-021</li> */}
                          <li>کارشناس فنی آتنا کاظم زاده : 81562028-021</li>
                          <li>کارشناس فنی فاطمه نصیری زند : 81562082-021</li>
                          <li>نمابر : 81562024-021</li>
                        </h4>
                        {/* <CollapsibleTable /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default MainPage;
