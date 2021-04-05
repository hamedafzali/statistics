import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import banner from "../../assets/images/analytics-banner.png";
const Body = () => {
  return (
    <React.Fragment>
      <div class="container">
        <div className="row">
          <Card className="col-md-9">
            <Card.Img variant="top" src={banner} />
            <Card.Body>
              <Card.Title>آخرین خبرها</Card.Title>
              <Card.Text>
                <div class="row">
                  <Card className=" col col-lg-6">
                    <Card.Img
                      variant="top"
                      src="https://www.postbank.ir/DeskTopModules/News/showimage.aspx?id=17540&type=1&t=y&w=500&h=500"
                    />
                    <Card.Body>
                      <Card.Title>
                        استان ها و شعب برتر پست بانک ایران معرفی شدند
                      </Card.Title>
                      <Card.Text>
                        برنامه عملیاتی و اهداف کمی سالانه پست بانک ایران به
                        تفکیک استان‌ها و مناطق، همه ساله در ابتدای هرسال تعیین،
                        تصویب و ابلاغ می‌شود. فرآیند تحقق اهداف ابلاغی هرماه با
                        حضور مدیرعامل بانک، معاونین، مدیران امور و مدیران شعب
                        استان‌ها و مناطق سنجش و ارزیابی می‌شود.
                      </Card.Text>
                    </Card.Body>
                    {/* <Card.Footer>
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </Card.Footer> */}
                  </Card>
                  <Card className=" col col-lg-6">
                    <Card.Img
                      variant="top"
                      src="https://www.postbank.ir/DeskTopModules/News/showimage.aspx?id=17592&type=1&t=y&w=500&h=500"
                    />
                    <Card.Body>
                      <Card.Title>
                        معاون مالی و سرمایه گذاری خبرداد: افزایش بیش از 5 برابری
                        سود پست بانک ایران در 9 ماهه سال جاری
                      </Card.Title>
                      <Card.Text>
                        سیداصغر جلیلی نیا معاون مالی و سرمایه گذاری مدیرعامل پست
                        بانک ایران گفت: با توجه به استخراج صورت های مالی 9 ماهه
                        سال 1399، سود این بانک طی این مدت بیش از 5 برابر سال
                        گذشته افزایش یافته است. به گزارش روابط عمومی پست بانک
                        ایران: وی با اعلام این خبر افزود: سود عملکرد این بانک در
                        سال 1398 به میزان 974 میلیارد ریال بود که طی 9 ماهه سال
                        جاری به 5497 میلیارد ریال افزایش یافته است. جلیلی نیا در
                        ادامه اعلام کرد: دارایی های پست بانک ایران طی 9 ماهه سال
                        جاری حدود 49 درصد افزایش داشته که مهمترین عوامل افزایش
                        آن شامل؛ رشد 71 درصدی تسهیلات و اوراق بهادار و همچنین
                        رشد 72 درصدی سپرده های دیداری، رشد 55 درصدی سپرده های پس
                        انداز و رشد 68 درصدی سپرده های مدت دار بوده است.
                      </Card.Text>
                    </Card.Body>
                    {/* <Card.Footer>
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </Card.Footer> */}
                  </Card>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="col-md-3 ">
            <Card.Img
              variant="top"
              src="https://www.postbank.ir/Upload/Modules/Contents/asset0/mr-shiri98.jpg"
            />
            <Card.Body>
              <Card.Text className="text-justify">
                اول دی‌ماه در تقویم تاریخِ پست‌بانک‌ایران، یادآور عهد و پیمانی‌
                ا‌ست که به پشتوانه‌ی دانش و کاردانی در سایه‌ی صداقت، درایت و
                نوآوری، پیشرفتِ ایرانی آباد را اُمید داد. حال در تقارن با نخستین
                روزِ زمستان که از بلندترین تاریکی شبِ سال، عبور کرده و چشم
                به‌راه درخششِ سپیدی برف است تا پژمردگی خزان را بپوشاند و بسترِ
                زمین را برای استقبال از بهاری سرسبز و پربار سیراب کند؛ ما نیز
                همچون بیست‌وچهار سالِ پیش از این، به روشنی فردای یلدا با درکنار
                هم بودن و فشردنِ صمیمانه‌ی دستِ همکاری و تلاش، دل به همّت و خدمت
                گرم می‌کنیم تا بتوانیم روزهای سخت و سرد اقتصادی را به اُمیدِ
                جلای آفتابِ تابانِ رونق و گشایش کسب‌وکارها، پشت سر بگذاریم. اینک
                طلیعه‌ی بیست و پنجمین سال آغاز فعالیت پست‌بانک‌ایران به عنوان
                برترین بانک دولتی را چون تفأّلِ شبِ یلدا به لسان‌الغیب به فالِ
                نیک می‌گیریم و ضمن تبریک به همکارانِ عزیزم، سهامداران ارجمند و
                مشتریان گرامی، قادر متعال را شاکریم که در ربع قرن فعالیت
                بی‌وقفه، همواره اهتمام و اعتماد را سرلوحه‌ی عهد خویش قرار دادیم
                تا با پیمودن قلّه‌های تجربه و اُمید اُفق روشنی را برای آیندگان
                به یادگار بگذاریم.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Body;
