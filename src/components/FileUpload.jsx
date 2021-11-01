import React, { useState, useEffect } from "react";
import { upload } from "../services/files";
const FileUpload = ({ URL, label, type, callback }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isUploded, setIsUploded] = useState([false, null]);
  useEffect(() => {
    if (selectedFile) {
      setIsFilePicked(true);
      handleSubmission();
    }
  }, [selectedFile]);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("file", selectedFile);
    if (URL.length)
      upload(URL, formData).then((res, err) => {
        if (res.statusText === "OK") {
          setIsUploded([true, res.data]);
          console.log(isUploded);
          callback();
        } else {
          console.log(err);
        }
      });

    //console.log("res", res);
    //     fetch(URL + fileName, {
    //       method: "POST",
    //       body: formData,
    //     })
    //       .then((response) => response.json())
    //       .then((result) => {
    //         console.log("Success:", result);
    //         setIsUploded([true, result]);
    //       })
    //       .catch((error) => {
    //         console.error("Error:", error);
    //       });
  };

  //   return isUploded[0] ? (
  //     <div style={{ display: "flex", width: "100%" }}>
  //       <div>
  //         <i
  //           onClick={() => setIsUploded([false, null])}
  //           className={`text-success fa fa-fw fa-check-circle d-inline`}
  //           style={{ fontSize: "1.75em", cursor: "pointer" }}
  //         />
  //         {isUploded[1].name}
  //       </div>
  //     </div>
  //   ) : (
  return (
    <div className="input-group mb-3">
      {type === "full" ? (
        <>
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              {label}
            </span>
          </div>
          <input
            type="text"
            readOnly
            style={{ height: "38px" }}
            value={isUploded[0] ? isUploded[1].name : ""}
          />
        </>
      ) : (
        ""
      )}

      <label
        for={`files`}
        className="btn btn-sm btn-outline-primary text-nowrap"
      >
        انتخاب فایل
      </label>
      <input
        type="file"
        id={`files`}
        onChange={changeHandler}
        style={{ visibility: "hidden", width: 0 }}
      />
      <p>{isUploded[0] ? isUploded[1].name : ""}</p>
    </div>
  );
  //   );
};

export default FileUpload;
