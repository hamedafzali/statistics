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
  getBranchAdditionSummary,
  getBranchAddition,
  readBranchAddition,
} from "../services/karnameh";
import BranchAdditionUploadTable from "./BranchAdditionUploadTable";
import CreateGuid from "../utils/GUID";
const BranchAdditionUpload = () => {
  const [loading, setLoading] = useState(false);
  const [GUID, setGUID] = useState("");
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("2");
  useEffect(() => {
    setGUID(CreateGuid());
    handleBranchAdditionSummary();
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
  const handleBranchAdditionSummary = async () => {
    setLoading(true);
    const { data } = await getBranchAdditionSummary();
    setData(data);
    setLoading(false);
  };

  const downloadHandler = async (date) => {
    setLoading(true);
    setSelectedDate(date);
    date = date.replaceAll(/\//g, "");
    //console.log(date);
    const { data } = await getBranchAddition(date);
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
    const { data } = await readBranchAddition({
      filelocation: `branchaddition${GUID}`,
      date: moment(date.toDate()).locale("fa").format("YYYYMMDD"),
      type: selectedType,
    });
    handleBranchAdditionSummary();
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
                <h4>بارگذاری کارگزاری/ارزی</h4>
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
                        <div>
                          <input
                            class=""
                            type="radio"
                            name="exampleRadios"
                            id="kargozari"
                            value="2"
                            checked={selectedType === "2"}
                            onChange={(e) =>
                              setSelectedType(e.currentTarget.value)
                            }
                          />
                          <label class=" mr-1" for="kargozari">
                            کارگزاری
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div>
                          <input
                            class=""
                            type="radio"
                            name="exampleRadios"
                            id="arzi"
                            value="1"
                            onChange={(e) =>
                              setSelectedType(e.currentTarget.value)
                            }
                            checked={selectedType === "1"}
                          />
                          <label class=" mr-1" for="arzi">
                            ارزی
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <FileUpload
                          URL={`/branchaddition${GUID}`}
                          callback={() => console.log(1)}
                          type="full"
                          label="فایل "
                        />
                        <ul className="text-danger">
                          <strong>نکات:</strong>
                          <li className="li">
                            نام فایل ارزی عدد "1" و نام فایل کارگزاری عدد "2" با
                            پسوند .xlsx باید باشد
                          </li>
                          <li className="li">نام فرم حتما Sheet1 باشد</li>
                          <li className="li">
                            فرمت فایل شامل کد شعبه(ستون اول) ، ساعت(ستون دوم) و
                            مبلغ(ستون سوم) میباشد
                          </li>
                          <li className="li">
                            یکی از ستونهای ساعت یا مبلغ باید حتما مقدار داشته
                            باشد
                          </li>
                          <li className="li">
                            ترتیب ستونها اهمیت دارد لذا نباید حذف یا جابجا شوند
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
                    <BranchAdditionUploadTable
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

export default BranchAdditionUpload;
