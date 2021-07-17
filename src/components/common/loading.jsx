import React from "react";
import logo from "../../assets/images/Logo Amar without.png";
import building from "../../assets/images/building.png";

const Loading = () => {
  return (
    <div className="overlay ">
      <div className="row">
        <div className="col-xl-6 col-lg-5 col-md-12 ">
          <img src={logo} className="waitLogo" alt="" width="100" />
          <h1 className="">سامانه آمار و بودجه</h1>
          <div className="wait ">لطفا تا بارگذاری کامل صفحه صبر کنید . . .</div>
        </div>
        <div className="col-xl-6 col-lg-7 col-md-12 ">
          <img
            className="rounded mx-auto d-block"
            src={building}
            alt=""
            height="80%"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
