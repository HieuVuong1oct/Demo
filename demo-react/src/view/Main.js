import React, { useState, useEffect } from "react";
import "./App.css";
import Pagination from "../components/Pagination/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import { getData } from "../api";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Search from "../components/Search/Search";
import Table from "../components/Table/Table";
import PerPage from "../components/PerPage/PerPage";
function Main() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("name");
  const [page, setPage] = useState({ totalPage: 0, pageActive: 1, perPage: 3 });
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState("SX");
  const [searchParams, setSearchParams] = useSearchParams();

  const goToPage = (pageNumber, searchKey, sortOrder, perPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", pageNumber || 1);
    newParams.set("searchKey", searchKey);
    newParams.set("query", newBook);
    newParams.set("sortOrder", sortOrder);
    newParams.set("perPage", perPage);
    setSearchParams(newParams);
  };

  useEffect(() => {
    try{

    
    const queryPage = searchParams.get("page");
    const queryBook = searchParams.get("query");
    const querySearchKey = searchParams.get("searchKey");
    const querySortOrder = searchParams.get("sortOrder");
    const queryPerPage = searchParams.get("perPage");
    if (queryPage && parseInt(queryPage, 10) !== currentPage) {
      setCurrentPage(parseInt(queryPage, 10));
    }
    if (queryBook && queryBook !== newBook) {
      setNewBook(queryBook);
    }
    if (querySearchKey && querySearchKey !== searchKey) {
      setSearchKey(querySearchKey);
    }
    if (querySortOrder && querySortOrder !== sortOrder) {
      setSortOrder(querySortOrder);
    }
    if (queryPerPage && parseInt(queryPerPage, 10) !== page.perPage) {
      setPage({
        totalPage: page.perPage,
        pageActive: page.pageActive,
        perPage: parseInt(queryPerPage, 10),
      });
    }
  }catch(error) {
    console.error("Error ", error);
  }
  },  [searchParams]);
  
  const handleSearch = () => {
    const { list, page: pageData } = getData({
      searchKey: searchKey,
      searchValue: newBook,
      sortBy: sortOrder,
      sortKey: sortKey,
      perPage: page.perPage,
      pageActive: currentPage,
    });

    setBooks(list);
    setPage(pageData);

    goToPage(1, searchKey, sortOrder, page.perPage);
  };
  const handleDeleteBook = (index) => {
    const copyBooks = [...books];
    copyBooks.splice(index, 1);
    setBooks(copyBooks);
  };

  const handleSearchKeyChange = (event) => {
    let newSearchKey = event.target.value;
    setSearchKey(newSearchKey);
    goToPage(1, newSearchKey, sortOrder, page.perPage);
  };

  const handlePerPageChange = (event) => {
    let newPerPage = parseInt(event.target.value, 10);
    setPage({
      totalPage: page.perPage,
      pageActive: page.pageActive,
      perPage: newPerPage,
    });
    setCurrentPage(1);
    goToPage(1, searchKey, sortOrder, newPerPage);
  };
 
  useEffect(() => {
    const { list, page: pageData } = getData({
      searchKey: searchKey,
      searchValue: newBook,
      sortBy: sortOrder,
      sortKey: sortKey,
      perPage: page.perPage,
      pageActive: currentPage,
    });

    setBooks(list);
    setPage(pageData);
  }, [searchKey, currentPage, sortOrder, sortKey, page.perPage]);

  const handleSort = (key) => {
    let newSortOrder = "asc";
    if (sortKey === key) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      setSortKey(key);
    }
    setSortOrder(newSortOrder);
    goToPage(currentPage, searchKey, newSortOrder, page.perPage);
  };

  const getSortIcon = (key) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? (
      <i className="fas fa-arrow-up"></i>
    ) : (
      <i className="fas fa-arrow-down"></i>
    );
  };
  return (
    <div className="table-container">
      <h1>Các loại sách</h1>
      <Search
        newBook={newBook}
        setNewBook={setNewBook}
        handleSearchKeyChange={handleSearchKeyChange}
        handleSearch={handleSearch}
      />

      <Table
        handleSort={handleSort}
        getSortIcon={getSortIcon}
        books={books}
        handleDeleteBook={handleDeleteBook}
      />
      <div className="Pagination">
        <Pagination
          totalPages={page.totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          goToPage={goToPage}
          searchKey={searchKey}
          sortOrder={sortOrder}
          perPage={page.perPage}
        />
        <PerPage
          perPage={page.perPage}
          handlePerPageChange={handlePerPageChange}
        />
      </div>
    </div>
  );
}

export default Main;
