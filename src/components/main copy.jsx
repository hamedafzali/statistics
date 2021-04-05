// import React, { Component } from "react";
// //import BarChart from "react-bar-chart";
// import CollapsibleTable from "./common/collapseTable";
// class Links extends Component {
//   state = {
//     chartwidth: 500,
//     width: 0,
//     height: 0,
//     pageContent: { title: "لینکهای مرتبط" },
//   };
//   componentDidMount() {
//     this.setState({
//       width: window.innerWidth,
//       height: window.innerHeight - 20,
//     });
//   }
//   handleBarClick(element, id) {
//     console.log(`The bin ${element.text} with id ${id} was clicked`);
//   }
//   render() {
//     //const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//     return (
//       <main className="d-flex align-items-center min-vh-100 py-3 py-md-0  ">
//         <div className="container ">
//           <div className="card login-card ">
//             <div className="row no-gutters">
//               <div className="col-md">
//                 <div
//                   className="card-body "
//                   style={{ minHeight: this.state.height }}
//                 >
//                   <div className="brand-wrapper ">
//                     <h4>{this.state.pageContent.title}</h4>
//                     {/* <CollapsibleTable /> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }
// }

// export default Links;
