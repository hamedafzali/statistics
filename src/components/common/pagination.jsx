import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" attribute="" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

// import React from "react";
// import PropTypes from "prop-types";
// import _ from "lodash";

// const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
//   //console.log("pagination", itemsCount, pageSize, currentPage, onPageChange);
//   const pagesCount = Math.ceil(itemsCount / pageSize);
//   const blockCount = Math.ceil(itemsCount / pageSize / 10) + 1;
//   const currentBlock = Math.ceil(currentPage / 10);
//   // console.log(
//   //   itemsCount,
//   //   pagesCount,
//   //   currentBlock,
//   //   pagesCount + 10 - currentBlock * 10
//   // );
//   if (pagesCount === 1) return null;
//   const pages = _.range(
//     (currentBlock - 1) * 10 + 1,
//     pagesCount - currentBlock * 10 > 10 ? currentBlock * 10 + 1 : blockCount + 1
//   );

//   return (
//     <nav>
//       <div
//         className="pagination mb-2"
//         style={{
//           fontSize: "9px",
//           fontWeight: "bolder",
//           fontFamily: "tahoma",
//         }}
//       >
//         {currentBlock !== 1 ? (
//           <React.Fragment>
//             <li key={1} className="page-item">
//               <a className="page-link ml-2" onClick={() => onPageChange(1)}>
//                 ابتدا
//               </a>
//             </li>
//             <li
//               key={
//                 (currentBlock - 2) * 10 +
//                 (currentPage - (currentBlock - 1) * 10)
//               }
//               className="page-item"
//             >
//               <a
//                 className="page-link "
//                 onClick={() =>
//                   onPageChange(
//                     (currentBlock - 2) * 10 +
//                       (currentPage - (currentBlock - 1) * 10)
//                   )
//                 }
//               >
//                 {"<"}
//               </a>
//             </li>
//           </React.Fragment>
//         ) : null}

//         {pages.map((page) => (
//           <li
//             key={page}
//             className={page === currentPage ? "page-item active" : "page-item"}
//           >
//             <a className="page-link " onClick={() => onPageChange(page)}>
//               {page}
//             </a>
//           </li>
//         ))}
//         {currentBlock !== blockCount - 1 ? (
//           <React.Fragment>
//             <li
//               key={currentBlock * 10 + (currentPage - (currentBlock - 1) * 10)}
//               className="page-item"
//             >
//               <a
//                 className="page-link"
//                 onClick={() =>
//                   onPageChange(
//                     currentBlock * 10 + (currentPage - (currentBlock - 1) * 10)
//                   )
//                 }
//               >
//                 {">"}
//               </a>
//             </li>
//             <li key={pagesCount} className="page-item">
//               <a
//                 className="page-link mr-2"
//                 onClick={() => onPageChange(pagesCount)}
//               >
//                 انتها
//               </a>
//             </li>
//           </React.Fragment>
//         ) : null}
//       </div>
//     </nav>
//   );
// };

// Pagination.propTypes = {
//   itemsCount: PropTypes.number.isRequired,
//   pageSize: PropTypes.number.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
// };

// export default Pagination;
