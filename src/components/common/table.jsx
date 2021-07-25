import React, { useState } from "react";
import TableHeader from "./tableHeader";
import logo from "../../assets/images/loading.gif";
import TableBody from "./tableBody";
import Inputsm from "../common/inputsm";
import Select from "../common/select";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import Pagination from "../common/pagination";
import { Collapse } from "react-bootstrap";
import { CSVLink } from "react-csv";
import Overlay from "react-overlay-component";
import "bootstrap/dist/css/bootstrap.min.css";

const Table = ({
  columns,
  data,
  onCommit,
  tbhandleChange,
  height,
  title,
  loading,
  refresh,
  doRefresh,
}) => {
  const [isOpen, setOverlay] = useState(false);
  const closeOverlay = () => setOverlay(false);
  const [size, setSize] = useState(13);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pageSizeOpen, setPageSizeOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(200);
  const [keyword, setKeyword] = useState("");

  const pageSizeData = [
    { id: 10, name: "10" },
    { id: 25, name: "25" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
    { id: 200, name: "200", selected: true },
    { id: 500, name: "500" },
  ];
  let sortedCol = "";
  try {
    sortedCol = columns.filter((i) => i.sorted === true)[0].path;
  } catch (e) {}

  const [sortColumn, setSortColumn] = useState({
    path: sortedCol,
    order: "asc",
  });

  const doSearch = (data) => {
    return _.filter(data, function (item) {
      //_.indexOf(data).conca
      try {
        var s = "";
        columns.forEach((i) => {
          s += item[i.path];
        });

        if (s.indexOf(keyword) !== -1) {
          //if (_.indexOf(s, keyword) !== -1) {
          return item;
        } else return null;
      } catch (e) {
        return null;
      }
    });
  };

  const configs = {
    animate: true,
    // clickDismiss: false,
    // escapeDismiss: false,
    // focusOutline: false,
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const getPagedData = () => {
    let searchedData = doSearch(data);
    const sorted = _.orderBy(
      searchedData,
      [sortColumn.path],
      [sortColumn.order]
    );

    const PData = paginate(sorted, currentPage, pageSize);
    return { totalCount: searchedData.length, PData };
  };
  const handleSort = (sortColumn) => {
    //this.setState({ sortColumn });
    setSortColumn(sortColumn);
    //console.log(sortColumn);
  };
  const { totalCount, PData } = getPagedData();

  if (loading)
    return (
      <React.Fragment>
        <span className="input-group-text text-justifiy col-md">
          {title} تعداد :{totalCount}
        </span>
        <div>
          <img src={logo} alt="loading..." />
          <h3>در حال بارگذاری اطلاعات....</h3>
        </div>
      </React.Fragment>
    );
  if (!loading && data.length === 0) return <p>اطلاعاتی وجود ندارد.</p>;
  return (
    <div style={{ width: "100%" }}>
      <span className="input-group-text text-justifiy  inline-block mt-n4">
        {title} تعداد :{totalCount}
      </span>
      <div className="row">
        <div className="text-right col ">
          {data.length ? (
            <React.Fragment>
              <CSVLink data={data}>
                <i
                  // onClick={() => this.props.onCommit(item.Id)}
                  className={`btn-outline-success fa fa-fw fa-file-text-o`}
                  style={{ fontSize: "1.65em" }}
                />
              </CSVLink>
              <i
                // onClick={() => this.props.onCommit(item.Id)}
                className={`btn-outline-success fa fa-fw fa-file-excel-o`}
                style={{ fontSize: "1.65em" }}
              />
              <i
                // onClick={() => this.props.onCommit(item.Id)}
                className={`btn-outline-danger fa fa-fw fa-file-pdf-o`}
                style={{ fontSize: "1.65em" }}
              />
            </React.Fragment>
          ) : (
            ""
          )}
        </div>

        <div className="text-left  col">
          <i
            onClick={() => setSize(size - 1)}
            className={`btn-outline-danger fa fa-fw fa-minus`}
            style={{ fontSize: "1.25em" }}
          />
          <i
            onClick={() => setSize(size + 1)}
            className={`btn-outline-success fa fa-fw fa-plus`}
            style={{ fontSize: "1.25em" }}
          />
          <i
            onClick={() => {
              setOverlay(true);
            }}
            className={`btn-outline-primary fa fa-fw fa-expand`}
            style={{ fontSize: "1.25em" }}
          />
          <i
            onClick={() => setSearchOpen(!searchOpen)}
            className={`btn-outline-info fa fa-fw fa-search`}
            style={{ fontSize: "1.25em" }}
          />
          <i
            onClick={() => setPageSizeOpen(!pageSizeOpen)}
            className={`btn-outline-info fa fa-fw fa-arrows-v`}
            style={{ fontSize: "1.25em" }}
          />
          {refresh ? (
            <i
              onClick={() => {
                doRefresh();
              }}
              className={`btn-outline-info fa fa-fw fa-refresh`}
              style={{ fontSize: "1.25em" }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        <div>
          <Collapse in={searchOpen}>
            <div>
              <Inputsm
                type="text"
                name="search"
                error=""
                placeholder="عبارت مورد نظر را جهت جستجو وارد کنید"
                //value={this.state.account.Username}
                onChange={(e) => {
                  setKeyword(e.currentTarget.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </Collapse>

          <Collapse in={pageSizeOpen}>
            <div>
              <Select
                onChange={(e) => {
                  setpageSize(e.currentTarget.value);
                  setCurrentPage(1);
                  setPageSizeOpen(!pageSizeOpen);
                }}
                name="pageSize"
                //label="تاریخ"
                //error=""
                options={pageSizeData}
              />
            </div>
          </Collapse>
        </div>
      </div>
      <div
        style={
          height ? { overflow: "scroll", height: height, width: "100%" } : null
        }
      >
        <table
          className="table table-sm table-striped table-hover border"
          style={{ fontSize: size }}
        >
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
          <TableBody
            columns={columns}
            data={PData}
            onCommit={onCommit}
            tbhandleChange={tbhandleChange}
          />
        </table>
      </div>
      <div className="text-right">
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      <Overlay configs={configs} isOpen={isOpen} closeOverlay={closeOverlay}>
        <button
          className="danger"
          onClick={() => {
            window.print();
          }}
        >
          چاپ
        </button>
        <table
          className="table table-sm table-striped table-hover border bg-light"
          style={{ fontSize: size }}
        >
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
          <TableBody
            columns={columns}
            data={data}
            onCommit={onCommit}
            tbhandleChange={tbhandleChange}
          />
        </table>

        <button
          className="danger"
          onClick={() => {
            window.print();
          }}
        >
          چاپ
        </button>
      </Overlay>
    </div>
  );
};

export default Table;
