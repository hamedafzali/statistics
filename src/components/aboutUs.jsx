import React, { Component } from "react";

class AboutUs extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "اداره کل آمار و بودجه" },
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 20,
    });
  }
  handleBarClick(element, id) {
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  }
  render() {
    //const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    return (
      <React.Fragment>
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0  ">
          <div className="container ">
            <div className="card bg-dark text-warning text-right">
              <img
                className="card-img "
                style={{ opacity: 0.4 }}
                src="https://exed.economist.com/sites/default/files/hr_analytics.jpg"
                alt="Card image"
              />
              <div className="card-img-overlay">
                <h5 className="card-title"> {this.state.pageContent.title}</h5>

                <p className="card-text">
                  <p>
                    پست بانک ایران پس از تصویب اساسنامه توسط هیئت محترم وزیران
                    از دی ماه سال 1375 فعالیت خود را به طور رسمی آغاز کرد، و در
                    حال حاضر با دارا بودن حدود 6500 شعبه و باجه بانکی روستایی در
                    سراسر کشور انواع خدمات بانکی و مالی را به هموطنان عزیز ارائه
                    می‌دهد.
                  </p>
                  <h5>وظایف این اداره کل</h5>
                  <ul>
                    <li>
                      تولید و ارائه آمارهای رسمی با کیفیت با رعایت استانداردهای
                      آماری ملی و بین المللی
                    </li>

                    <li>استقرار سامانه جامع اطلاعات آماری</li>

                    <li>
                      بهبود و ارتقاء تعاملات و همکاری‌های سازنده علمی و حرفه‌ای
                      آماری در سطح ملی و بین المللی
                    </li>

                    <li>
                      توسعه شبکه ملی آمار با رعایت محرمانگی و حفظ امنیت داده ها
                      و اطلاعات با بهره گیری از فناوری های نوین اطلاعات و
                      ارتباطات
                    </li>

                    <li>
                      گسترش و تسهیل دسترسی به آمارهای رسمی ، ارتقای آگاهی و
                      اعتماد عمومی و ترویج و اشاعه کاربرد و تفسیر صحیح آمار توسط
                      سیاستگذاران، برنامه ریزان،محققین
                    </li>
                  </ul>
                </p>
                <p className="card-text">آخرین به روز رسانی 1 ماه پیش</p>
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

export default AboutUs;
