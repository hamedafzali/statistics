import { useEffect, useState } from "react";
import moment from "jalali-moment";
//import Inputsm from "./common/inputsm";
import FileUpload from "./FileUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  getKarnamehSummary,
  getKarnameh,
  readKarnameh,
} from "../services/karnameh";
import KarnamehUploadTable from "./KarnamehUploadTable";
import CreateGuid from "../utils/GUID";
const KarnamehUpload = () => {
  const [loading, setLoading] = useState(false);
  const [GUID, setGUID] = useState("");
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("TS");
  useEffect(() => {
    setGUID(CreateGuid());
    handleKarnamehSummary();
    setDate(
      moment(new Date().toJSON().slice(0, 10).replace(/-/g, "/"), "YYYY/MM/DD")
        .locale("fa")
        .format("YYYY/MM/DD")
    );
  }, []);

  //   const handleChange = (e) => {
  //     const ar = [setDate];
  //     ar[0]("1399/01/01");
  //   };
  const handleKarnamehSummary = async () => {
    setLoading(true);
    const { data } = await getKarnamehSummary();
    setData(data);
    setLoading(false);
  };

  const downloadHandler = async (date) => {
    setLoading(true);
    setSelectedDate(date);
    date = date.replaceAll(/\//g, "");
    //console.log(date);
    const { data } = await getKarnameh(date);
    setSelectedData(data);
    //console.log(excelData);
    setLoading(false);
  };
  const readFileHandler = async () => {
    //console.log(moment(date.toDate()).locale("fa").format("YYYY/MM/DD"));
    try {
      moment(date.toDate()).locale("fa").format("YYYYMMDD");
    } catch (e) {
      showMessage("تاریخ را انتخاب کنید", "error");
      return false;
    }
    setLoading(true);
    const { data } = await readKarnameh({
      filelocation: `karnameh${GUID}`,
      date: moment(date.toDate()).locale("fa").format("YYYYMMDD"),
      type: selectedType,
    });
    handleKarnamehSummary();
    setLoading(false);

    data
      ? showMessage(
          `بارگذاری فایل ${selectedType} با موفقیت انجام شد`,
          "success"
        )
      : showMessage(`اشکال در انجام بارگذاری فایل`, "error");
  };
  function just_persian({ currentTarget: input }) {
    var p = /^[\u0600-\u06FF\s]+$/;
    if (!p.test(input.value)) {
      alert("not format");
      input.value = "";
    }
  }
  const showMessage = (msg, type) => {
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
  return (
    <main className="d-flex align-items-center  py-md-0  ">
      <div className="container ">
        <div className="card login-card ">
          <div className="row no-gutters">
            <div className="col-md">
              <div className="card-title btn-secondary">
                <h4>بارگذاری فایل کارنامه</h4>
              </div>

              <div
                className="card-body "
                style={{ minHeight: "80vh", marginBottom: "2rem" }}
              >
                <div className="row">
                  <div className="col">شناسه بارگذاری فایل : {GUID}</div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    <div className="row border bg-light rounded">
                      <div className="col">
                        <div class=" p-2">
                          <input
                            class=""
                            type="radio"
                            name="exampleRadios"
                            id="TSRadio"
                            value="TS"
                            onChange={(e) =>
                              setSelectedType(e.currentTarget.value)
                            }
                            checked={selectedType === "TS"}
                          />
                          <label class=" mr-1" for="TSRadio">
                            تجمعی شعبه TS
                          </label>
                        </div>
                        <div class=" p-2">
                          <input
                            class=""
                            type="radio"
                            name="exampleRadios"
                            id="TORadio"
                            value="TO"
                            checked={selectedType === "TO"}
                            onChange={(e) =>
                              setSelectedType(e.currentTarget.value)
                            }
                          />
                          <label class=" mr-1" for="TORadio">
                            تجمعی سرپرستی TO
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div class=" p-2">
                          <input
                            class=""
                            type="radio"
                            name="exampleRadios"
                            id="MSRadio"
                            value="MS"
                            checked={selectedType === "MS"}
                            onChange={(e) =>
                              setSelectedType(e.currentTarget.value)
                            }
                          />
                          <label class=" mr-1" for="MSRadio">
                            ماهانه شعبه MS
                          </label>
                        </div>
                        <div class=" p-2">
                          <input
                            class=""
                            type="radio"
                            name="exampleRadios"
                            id="MORadio"
                            value="MO"
                            checked={selectedType === "MO"}
                            onChange={(e) =>
                              setSelectedType(e.currentTarget.value)
                            }
                          />
                          <label class=" mr-1" for="MORadio">
                            ماهانه سرپرستی MO
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <FileUpload
                          URL={`/karnameh${GUID}`}
                          callback={() => console.log(1)}
                          type="full"
                          label="فایل "
                        />
                        <ul className="text-danger">
                          <strong>نکات:</strong>
                          <li className="li">
                            نوع فایل با فایل انتخاب شده میبایست یکسان باشد در
                            غیر این صورت فایل بارگذاری نمیشود
                          </li>
                          <li className="li">تاریخ می بایست حتما انتخاب شود</li>
                          <li className="li">
                            فرمت فایل باید حتما مانند خروجی نرم افزار مدیریت
                            پایش و پویش(تاژان) ماه قبل باشد
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col col-4">
                    <Calendar
                      calendar={persian}
                      locale={persian_fa}
                      onlyMonthPicker
                      onChange={setDate}
                      value={date}
                    />
                  </div>
                </div>

                <div className="row">
                  <div
                    className={
                      loading
                        ? "btn btn-secondary btn-block disabled"
                        : "btn btn-success btn-block"
                    }
                    onClick={readFileHandler}
                  >
                    {loading ? "لطفا صبر کنید..." : "بارگذاری فایل"}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <KarnamehUploadTable
                      data={data}
                      //title={}
                      loading={false}
                      onClick={downloadHandler}
                      selectedDate={selectedDate}
                      selectedData={selectedData}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer className="text-center" />
    </main>
  );
};

export default KarnamehUpload;
