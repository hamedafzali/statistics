import React, { Component } from "react";
//import logo from "../assets/images/Logo Amar without.png";
import Inputsm from "./common/inputsm";
import "../assets/css/message.css";
import helpdesk from "../assets/images/helpdesk.png";
import user from "../assets/images/user.png";
//import CollapsibleTable from "./common/collapsibleTable";
//import { ChatFeed, Message } from "react-chat-ui";
class Messages extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "مدیریت پیامها" },
    collapse: 1,
    is_typing: false,
    code: 0,
    message: [
      {
        sender: "حامد افضلی",
        reciever: "مهدی محمد نیا",
        message: "سلام",
        time: new Date(),
        type: 1,
      },
      {
        sender: "حامد افضلی",
        reciever: "مهدی محمد نیا",
        message: "سلام",
        time: new Date(),
        type: 2,
      },
    ],
    contacts: [
      {
        organization: "اداره کل آمار و بودجه",
        code: "H8002",
        unread: 10,
      },
      {
        organization: "حوزه مقاومت بسیج",
        code: "L8001",
        unread: 6,
      },
      {
        organization: "اداره کل آمار و بودجه",
        code: "M8001",
        unread: 22,
      },
      {
        organization: " فلاورجان",
        code: "979",
        unread: 5,
      },
      {
        organization: "شعبه شهید فلاحی",
        code: "0183",
        unread: 0,
      },
    ],
  };
  handleCollapse = (id) => {
    const newState = { ...this.state };
    newState.collapse = id;
    this.setState(newState);
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.initialMessage();
  }
  handleBarClick(element, id) {
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  }
  handleMsg = (type) => {
    alert(type);
  };
  handleContactClick = (person) => {
    console.log(person);
  };
  initialMessage = () => {
    const code =
      window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 1
      ];
    this.setState({ code }, () => {});
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
                  <div className="brand-wrapper ">
                    <div className="row">
                      <div className="col col-lg-3 col-sm-12 col-xs-12">
                        {this.state.contacts.map((row) => {
                          return (
                            <div
                              style={{
                                borderRadius: 20,
                                zIndex: 1,
                                height: 30,
                                boxShadow: "5px 5px 5px grey",
                              }}
                              className={
                                this.state.collapse === row.code
                                  ? "col btn btn-light border-success p-1 mt-2 mr-4 bg-success text-light"
                                  : "col btn btn-light  p-1 mt-2   border"
                              }
                              onClick={() => this.handleCollapse(row.code)}
                            >
                              <h6
                                className={
                                  this.state.collapse === row.code
                                    ? " text-light"
                                    : " text dark"
                                }
                              >
                                <p>
                                  {row.organization + "-" + row.code}
                                  {row.unread === 0 ? (
                                    ""
                                  ) : (
                                    <p className="badge badge-danger mr-2">
                                      {row.unread}
                                    </p>
                                  )}
                                </p>
                              </h6>
                            </div>
                          );
                        })}
                      </div>
                      <div className="col col-lg-9 col-sm-12 col-xs-12">
                        <div
                          style={{
                            overflow: "scroll",
                            height: 350,
                            width: "100%",
                            backgroundColor: "#eee",
                            boxShadow: "1px 3px 1px #9E9E9E",
                            margin: 10,
                          }}
                        >
                          <div className="messageContainer">
                            <div className="messageDetail">
                              <img src={user} alt="Avatar" />
                              <p>
                                پژوهشگران اقتصادي در مورد نقش بنيادين بازارهاي
                                مالي توسعه يافته، کارآمد و پويا در تحقق رشد و
                                توسعه اقتصادي اتفاق نظر دارند. بر اين اساس هر
                                بخشي از اقتصاد کشور بخواهد در مسير پيشرفت ايران
                                اسلامي گام بردارد بايستي از اقتصاد مالي و پولي
                                که پشتيباني کننده سرمايه گذاري و در نهايت ارتقاي
                                سطح توليد است، برخوردار باشد. خداوند تبارک و
                                تعالي را شاکريم که در سال «جهش‌توليد»، پست بانک
                                ايران با برنامه محوري، شفافيت و تکيه بر سرمايه
                                انساني متخصص و متعهد توانست مشکلات و چالش‌هاي
                                تاريخي خود را به شدت کاهش داده و در خدمت
                                روستائيان شريف و زحمتکش قرار گيرد. بررسي شاخص
                                هاي مهم امور بانکي در سال مالي 1399 حکايت از
                                تحقق منويات رهبر معظم انقلاب در جهش و تحقق پيچ
                                تاريخي در اين بانک بوده و با فراق بال در سال
                                «توليد، پشتيباني ها و مانع زدايي ها» در برنامه
                                هاي راهبردي خود و تحول ديجيتال و توجه ويژه به
                                اشخاص و فعالين حوزه روستايي و مناطق کم برخوردار
                                نقش محوري در توسعه و آباداني کشور ايفا نمايد.
                                جهش اول: بهبود شاخص‌هاي مالي نهاد قدرتمند مالي
                                مي‌تواند در خدمت بخش حقيقي اقتصاد باشد و به
                                تسريع حرکت در آن عرصه بپردازد، اين اولين اعتقادي
                                بود که در دو سال اخير در سطح مديريت و کارکنان
                                بانک براي خدمت به نظام مقدس جمهوري اسلامي ايران
                                و کليه ذينفعان بانک نهادينه شد. بانکي که خود با
                                زيان عملياتي سالانه و زيان انباشته (مشمول ماده
                                141 قانون تجارت) دست به گريبان بود، نه تنها توان
                                کمک به بخش روستايي را نداشت بلکه بايستي از ارزش
                                افزوده‌هاي آنها تغذيه مي‌کرد. اما تحولات رخ داده
                                در اين عرصه، عليرغم فقدان تزريق سرمايه به بانک
                                به دليل داشتن ماهيت دولتي، همانطور که در نمودار
                                شماره 1 ملاحظه مي شود بالاي 600 درصدي سودآوري
                                بانک نمايانگر ثبت رکورد جهش در اين شاخص براي سال
                                مالي 1399 مي باشد.
                              </p>
                              <span className="time-right">11:00</span>
                            </div>
                          </div>
                          <div className="messageContainerRight">
                            <div className="messageDetail darker">
                              <img
                                src={helpdesk}
                                alt="Avatar"
                                className="right"
                              />
                              <p>Hey! I'm fine. Thanks for asking!</p>
                              <span className="time-left">11:01</span>
                            </div>
                          </div>
                          <div className="messageContainer">
                            <div className="messageDetail">
                              <img
                                src="https://www.w3schools.com/w3images/bandmember.jpg"
                                alt="Avatar"
                              />
                              <p>Sweet! So, what do you wanna do today?</p>
                              <span className="time-right">11:02</span>
                            </div>
                          </div>
                          <div className="messageContainerRight">
                            <div className="messageDetail darker">
                              <img
                                src="https://www.w3schools.com/w3images/avatar_g2.jpg"
                                alt="Avatar"
                                className="right"
                              />
                              <p>
                                Nah, I dunno. Play soccer.. or learn more coding
                                perhaps?
                              </p>
                              <span className="time-left">11:05</span>
                            </div>
                          </div>
                          <div className="messageContainer">
                            <div className="messageDetail">
                              <img
                                src="https://www.w3schools.com/w3images/bandmember.jpg"
                                alt="Avatar"
                              />
                              <p>Hello. How are you today?</p>
                              <span className="time-right">11:00</span>
                            </div>
                          </div>
                          <div className="messageContainerRight">
                            <div className="messageDetail darker">
                              <img
                                src="https://www.w3schools.com/w3images/avatar_g2.jpg"
                                alt="Avatar"
                                className="right"
                              />
                              <p>Hey! I'm fine. Thanks for asking!</p>
                              <span className="time-left">11:01</span>
                            </div>
                          </div>
                          <div className="messageContainer">
                            <div className="messageDetail">
                              <img
                                src="https://www.w3schools.com/w3images/bandmember.jpg"
                                alt="Avatar"
                              />
                              <p>Sweet! So, what do you wanna do today?</p>
                              <span className="time-right">11:02</span>
                            </div>
                          </div>
                          <div className="messageContainerRight">
                            <div className="messageDetail darker">
                              <img
                                src="https://www.w3schools.com/w3images/avatar_g2.jpg"
                                alt="Avatar"
                                className="right"
                              />
                              <p>
                                Nah, I dunno. Play soccer.. or learn more coding
                                perhaps?
                              </p>
                              <span className="time-left">11:05</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col col-3"></div>
                      <div className="col ">
                        <div className="form-group row">
                          <div className="col-sm-11 ">
                            <Inputsm className="d-inline" />
                          </div>
                          <div className="btn btn-success d-inline ">ارسال</div>
                        </div>
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

export default Messages;
