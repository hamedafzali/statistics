import React, { Component } from "react";
import ListGroup from "./common/listGroup";

class ContactUs extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    pageContent: { title: "تماس با ما" },
    selectedEmployee: {},
    employees: [
      {
        id: 1,
        name: "سید اصغر جلیلی نیا",
        post: "معاون مالی و سرمایه گذاری",
        tel: "81563050",
        description: "تست",
        src:
          "https://www.postbank.ir/DeskTopModules/News/showimage.aspx?id=17592&type=1&t=y&w=500&h=500",
      },
      {
        id: 2,
        name: "دکتر شهنام زندیه",
        post: "رییس اداره کل آمار و بودجه",
        tel: "88921425",
        description: "تست",
        src:
          "https://www.postbank.ir/Upload/Modules/Contents/asset0/Mr-zandiye.jpg",
      },
      {
        id: 3,
        name: "احسان امیری",
        post: "معاون اداره کل آمار و بودجه",
        tel: "81562025",
        description: "تست",
        src:
          "https://www.postbank.ir/Upload/Modules/Contents/asset0/amiri-96.jpg",
      },
      {
        id: 4,
        name: "علی جمالی",
        post: "کارشناس مسئول آمار و اطلاعات بانکی",
        tel: "81562067",
        description: "تست",
      },
      {
        id: 5,
        name: "مجید محمدی پور",
        post: "کارشناس گروه آمار و اطلاعات بانکی",
        tel: "81562022",
        description: "تست",
      },
      {
        id: 6,
        name: "لیلا نجاتی",
        post: "کارشناس گروه آمار و اطلاعات بانکی",
        tel: "81562044",
        description: "تست",
      },
      {
        id: 7,
        name: "حامد افضلی نژاد",
        post: "کارشناس مسئول تحلیل و پیش بینی داده ها",
        tel: "81562078",
        description: "تست",
      },
      {
        id: 8,
        name: "فاطمه نصیری زند",
        post: "کارشناس گروه تحلیل و پیش بینی داده ها",
        tel: "81562082",
        description: "تست",
      },
      {
        id: 9,
        name: "آتنا کاظم زاده",
        post: "کارشناس گروه تحلیل و پیش بینی داده ها",
        tel: "81562028",
        description: "تست",
      },
      {
        id: 10,
        name: "منیژه مرادیان",
        post: "کارشناس مسئول بودجه",
        tel: "81563059",
        description: "تست",
      },
      {
        id: 11,
        name: "مژگان نجومی",
        post: "کارشناس گروه بودجه",
        tel: "81563023",
        description: "تست",
      },
      {
        id: 12,
        name: "لیلا اسعدی",
        post: "کارشناس گروه بودجه",
        tel: "81563047",
        description: "تست",
      },
    ],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 20,
    });
  }
  handleEmployeeSelect = (Employee) => {
    //console.log(Employee);
    this.setState({
      selectedEmployee: Employee,
      searchQuery: "",
      currentPage: 1,
    });
  };

  render() {
    return (
      <React.Fragment>
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0  ">
          <div className="container ">
            <div className="card bg-dark text-warning text-right">
              <img
                className="card-img "
                style={{ opacity: 0.4 }}
                src="https://assets.entrepreneur.com/content/3x2/2000/20170130170703-GettyImages-539953664.jpeg"
                alt="Card image"
              />
              <div className="card-img-overlay">
                <h5 className="card-title"> {this.state.pageContent.title}</h5>

                <p className="card-text">
                  <div className="content">
                    <div className="row">
                      <div className="col">
                        <p>
                          مدیریت و کارشناسان اداره کل آمار و بودجه همواره سعی در
                          جهت تهیه و گزارشات آماری مورد نیاز مدیریت کلان بانک و
                          زیر مجموعه نموده اند لذا در صورت نیاز به گزارشات جدید
                          و یا در صورت هرگونه مشکل در این خصوص این اداره کل
                          آماده شنیدن آن میباشد.
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-5 text-success">
                        <ListGroup
                          items={this.state.employees}
                          selectedItem={this.state.selectedEmployee}
                          onItemSelect={this.handleEmployeeSelect}
                        />
                      </div>
                      <div className="col">
                        {this.state.selectedEmployee.description ? (
                          <div
                            className="  bg-light"
                            style={{
                              height: this.state.height - 50,
                              opacity: 0.8,
                            }}
                          >
                            <div className="row text-center ">
                              <div className="col-lg  ">
                                <h3>{this.state.selectedEmployee["post"]}</h3>
                              </div>
                            </div>{" "}
                            <div className="row text-center ">
                              <div class="col-lg">
                                <img
                                  width="400"
                                  src={this.state.selectedEmployee["src"]}
                                ></img>
                              </div>
                            </div>
                            <div className="row text-center ">
                              <div class="col-lg">
                                {/* {this.state.selectedEmployee["description"]} */}
                                <br />
                                <h5>رزومه:</h5>
                                <br />
                                <br />
                                <br />
                                <br />
                              </div>
                            </div>
                            <div className="row text-center ">
                              <div class="w-100 ">
                                <h4>
                                  تلفن تماس:{this.state.selectedEmployee["tel"]}
                                </h4>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </p>
                {/* <p className="card-text">آخرین به روز رسانی 1 ماه پیش</p> */}
              </div>
            </div>
            {/* <div className="card login-card ">
              <div className="row no-gutters">
                <div className="col-md">
                  <div className="card-title btn-secondary">
                    <h4>{this.state.pageContent.title}</h4>
                  </div>

                  <div
                    className="card-body text-right"
                    style={{ minHeight: this.state.height }}
                  >
                    <h3>وظایف</h3>
                    <ul>
                      <li>
                        تولید و ارائه آمارهای رسمی با کیفیت با رعایت
                        استانداردهای آماری ملی و بین المللی
                      </li>

                      <li>استقرار سامانه جامع اطلاعات آماری</li>

                      <li>
                        بهبود و ارتقاء تعاملات و همکاری‌های سازنده علمی و
                        حرفه‌ای آماری در سطح ملی و بین المللی
                      </li>

                      <li>
                        توسعه شبکه ملی آمار با رعایت محرمانگی و حفظ امنیت داده
                        ها و اطلاعات با بهره گیری از فناوری های نوین اطلاعات و
                        ارتباطات
                      </li>

                      <li>
                        گسترش و تسهیل دسترسی به آمارهای رسمی ، ارتقای آگاهی و
                        اعتماد عمومی و ترویج و اشاعه کاربرد و تفسیر صحیح آمار
                        توسط سیاستگذاران، برنامه ریزان،محققین
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default ContactUs;
