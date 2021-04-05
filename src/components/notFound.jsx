import React, { Component } from "react";

class NotFound extends Component {
  state = {
    width: 0,
    height: 0,
    pageContent: { title: "دسترسی وجود ندارد" },
  };
  componentDidMount() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    return (
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0  ">
        <div className="container ">
          <div className="card login-card ">
            <div className="row no-gutters">
              <div className="col-md">
                <div
                  className="card-body "
                  style={{ minHeight: this.state.height }}
                >
                  <div className="brand-wrapper ">
                    <h1>
                      <i
                        className={`btn-outline-danger fa fa-fw fa-ban`}
                        style={{ fontSize: "6em" }}
                      />
                      <br />
                      {this.state.pageContent.title}
                    </h1>
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

export default NotFound;
