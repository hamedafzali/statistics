import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ExcelDownloader extends React.Component {
  render() {
    const { icon, data, name, columns } = this.props;
    //console.log(this.props);
    return (
      <ExcelFile element={icon} filename={name}>
        <ExcelSheet data={data} name={"منابع"}>
          {/* {Object.keys(data[0]).map((i) => (
            <ExcelColumn label={i} value={i} />
          ))} */}
          {columns.map((i) => {
            if (!i.label) return null;
            else return <ExcelColumn label={i.label} value={i.path} />;
          })}
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
