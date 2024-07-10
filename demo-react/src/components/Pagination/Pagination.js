import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pagination.css";
const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  goToPage,
  searchKey,
  sortOrder,
  newBook,
  perPage,
}) => {
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    goToPage(pageNumber, searchKey, newBook, sortOrder, perPage);
  };

  const renderPagination = () => {
    const maxPagesToShow = 5;
    const pages = [];
    let startPage, endPage;
    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxPagesToShow / 2);
        endPage = currentPage + Math.ceil(maxPagesToShow / 2) - 1;
      }
    }

    if (startPage > 1) {
      pages.push(
        <button
          className="btnPagination"
          key={1}
          onClick={() => handleClick(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key={"ellipsis1"} className="ellipsis">
            {" "}
            . . .{" "}
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key={"ellipsis2"} className="ellipsis">
            {" "}
            . . .{" "}
          </span>
        );
      }

      pages.push(
        <button
          className="btnPagination"
          key={totalPages}
          onClick={() => handleClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="btnPagination"
      >
        &lt;
      </button>
      {renderPagination()}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="btnPagination"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
