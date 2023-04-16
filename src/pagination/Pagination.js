import React from "react";
import PropTypes from "prop-types";

import "../styles/pagination.css";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  displayRange,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  let startPage = 1;
  let endPage = totalPages;
  if (totalPages > displayRange) {
    const halfDisplay = Math.floor(displayRange / 2);
    if (currentPage <= halfDisplay) {
      endPage = displayRange;
    } else if (currentPage + halfDisplay >= totalPages) {
      startPage = totalPages - displayRange + 1;
    } else {
      startPage = currentPage - halfDisplay;
      endPage = currentPage + halfDisplay;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-wrapper">
      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item" onClick={() => paginate(currentPage - 1)}>
            <button className="page-link">Previous</button>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item${currentPage === number ? " active" : ""}`}
            onClick={() => paginate(number)}
          >
            <button className="page-link">{number}</button>
          </li>
        ))}

        {currentPage < totalPages && (
          <li className="page-item" onClick={() => paginate(currentPage + 1)}>
            <button className="page-link">Next</button>
          </li>
        )}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  displayRange: PropTypes.number,
};

Pagination.defaultProps = {
  displayRange: 6,
};

export default Pagination;
