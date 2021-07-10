import React, { Component } from "react";
import TreeMenu, { defaultChildren } from "react-simple-tree-menu";
import { connect } from "react-redux";
import * as actions from "../store/employees";
import { ChartPerson } from "../services/tree";
import { getPersondata } from "../services/persons";
//import CollapsibleTable from "./common/collapsibleTable";
class LoginAs extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "ورود با کاربر" },
    person: {},
    personInfo: [],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.fillTree();
  }

  fillTree = async () => {
    let { data: personTreeData } = await ChartPerson(1);
    this.setState({ personTreeData });
  };
  treeClickHandler = async () => {
    const { data: personInfo } = await getPersondata(this.state.person.Code);
    this.setState({ personInfo });
  };
  render() {
    return (
      <main className="d-flex align-items-center  py-md-0  ">
        <div className="container ">
          <div className="card login-card ">
            <div className="row no-gutters">
              <div className="col-md">
                <div className="card-title btn-secondary">
                  <h4>{this.state.pageContent.title}</h4>
                </div>

                <div
                  className="card-body "
                  style={{ minHeight: this.state.height }}
                >
                  <div className="row mt-n5">
                    <div className="col col-lg-6 col-sm-12 col-12 ">
                      <h5
                        className="bg-secondary text-white"
                        style={{ borderRadius: 20 }}
                      >
                        مشخصات
                      </h5>
                      {this.state.personInfo.length ? (
                        <>
                          <table className="table table-striped table-hover">
                            <tbody>
                              <tr key="11">
                                <td>
                                  {`${this.state.personInfo[0].Supervisor}`}
                                </td>
                              </tr>
                              <tr key="21">
                                <td>{` ${this.state.personInfo[0].BranchName}/${this.state.personInfo[0].BranchCode}`}</td>
                              </tr>
                              <tr key="31">
                                <td>{`${this.state.personInfo[0].Name} ${this.state.personInfo[0].Family}`}</td>
                              </tr>
                              <tr key="41">
                                <td>{`${this.state.personInfo[0].Position} `}</td>
                              </tr>
                              <tr key="51">
                                <td>
                                  {`کد ملی ${this.state.personInfo[0].NationalCode}`}
                                </td>
                              </tr>
                              <tr key="61">
                                <td>
                                  {`${this.state.personInfo[0].Status} / ${this.state.personInfo[0].vajed}`}
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <div
                            onClick={() =>
                              this.props.addEmployee(this.state.personInfo)
                            }
                            className={
                              this.state.personInfo[0].UserStatus
                                ? "inline-block  btn btn-success btn-block mt-2 mb-2"
                                : "inline-block disabled  btn btn-secondary btn-block mt-2 mb-2"
                            }
                          >
                            ورود با کاربر
                            {` ${this.state.personInfo[0].Name} ${this.state.personInfo[0].Family}`}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="col col-lg-6 col-sm-12 col-xs-12 bg-light "
                      style={{ borderRadius: 20 }}
                    >
                      <div
                        style={{
                          overflow: "scroll",
                          height: 500,
                          direction: "ltr",
                        }}
                      >
                        <TreeMenu
                          data={this.state.personTreeData}
                          onClickItem={({ ...props }) => {
                            this.setState({ person: props }, () =>
                              this.treeClickHandler()
                            );
                          }}
                        >
                          {({ search, items }) => (
                            <div className="border border-dark p-1 rounded">
                              <div className="input-group input-group-sm mb-3">
                                <input
                                  onChange={(e) => search(e.target.value)}
                                  placeholder="جستجو"
                                  className="form-control text-right"
                                  aria-label="Small"
                                  aria-describedby="inputGroup-sizing-sm"
                                />
                              </div>
                              <strong>مقصد انتخاب کنید</strong>
                              {defaultChildren({ items })}
                            </div>
                          )}
                        </TreeMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees,
});
const mapDispatchToProps = (dispatch) => ({
  addEmployee: (obj) => dispatch(actions.addEmployee(obj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginAs);
