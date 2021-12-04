import { useEffect, useState } from "react";
import moment from "jalali-moment";
import Inputsm from "./common/inputsm";
import FileUpload from "./FileUpload";
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  getBajeManabehDehyariSummary,
  getBajeManabehDehyari,
  readBajeManabehDehyari,
} from "../services/baje";
import BajeDehyariUploadTable from "./BajeDehyariUploadTable";
import CreateGuid from "../utils/GUID";
const BajeDehyariUpload = () => {
  const [loading, setLoading] = useState(false);
  const [GUID, setGUID] = useState("");
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    setGUID(CreateGuid());
    handleBajeManabehSummary();
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
  const handleBajeManabehSummary = async () => {
    setLoading(true);
    const { data } = await getBajeManabehDehyariSummary();
    setData(data);
    setLoading(false);
  };

  const downloadHandler = async (date) => {
    setLoading(true);
    setSelectedDate(date);
    date = date.replaceAll(/\//g, "");
    //console.log(date);
    const { data } = await getBajeManabehDehyari(date);
    setSelectedData(data);
    //console.log(excelData);
    setLoading(false);
  };
  const readFileHandler = async () => {
    try {
      moment(date.toDate()).locale("fa").format("YYYYMMDD");
    } catch (e) {
      showMessage("تاریخ را انتخاب کنید", "error");
      return false;
    }
    //console.log(moment(date.toDate()).locale("fa").format("YYYY/MM/DD"));
    setLoading(true);
    const { data } = await readBajeManabehDehyari({
      filelocation: `dehyari${GUID}`,
      date: moment(date.toDate()).locale("fa").format("YYYYMMDD"),
    });
    handleBajeManabehSummary();
    setLoading(false);
    data
      ? showMessage(`بارگذاری فایل با موفقیت انجام شد`, "success")
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
                <h4>بارگذاری منابع دهیاری ها</h4>
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
                    <FileUpload
                      URL={`/dehyari${GUID}`}
                      callback={() => console.log(1)}
                      type="full"
                      label="فایل "
                    />
                    <ul className="text-danger">
                      <strong>نکات:</strong>
                      <li className="li">عنوان ستونها باید در ردیف 4 باشد</li>
                      <li className="li">
                        فرمت فایل باید مطابق با روزهای قبل باشد
                      </li>

                      <li className="li">
                        ترتیب ستونها اهمیت دارد لذا نباید حذف یا جابجا شوند
                      </li>
                    </ul>
                  </div>
                  <div className="col col-4">
                    {/* <Inputsm
                      name="Date"
                      placeholder="تاریخ فایل را با فرمت 1399/06/30 وارد کنید"
                      //type="datetime"
                      onChange={handleChange}
                      value={date}
                    /> */}
                    {/* <DatePicker
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      value={date}
                      onChange={setDate}
                    /> */}
                    <Calendar
                      calendar={persian}
                      locale={persian_fa}
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
                    <BajeDehyariUploadTable
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

export default BajeDehyariUpload;
