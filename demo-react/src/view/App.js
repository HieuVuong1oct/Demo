import React, { useState, useEffect } from "react";
import "./App.css";
import Pagination from "../components/Pagination/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import {  addDataToList, getData } from "../api";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Search from "../components/Search/Search";
import Table from "../components/Table/Table";
import PerPage from "../components/PerPage/PerPage";
function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("name");
  const [page, setPage] = useState({ totalPage: 0, pageActive: 1, perPage: 3 });
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState("SX");
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkParams, setCheckParams] = useState(false);
  const [checkBooks, setCheckBooks] = useState("");
  const [name, setName] = useState('');
  const [author,setAuthor] = useState("");
  const [year, setYear] = useState("")
  useEffect(() => {
    if (checkParams) {
      const { list, page: pageData } = getData({
        searchKey: searchKey,
        searchValue: checkBooks,
        sortBy: sortOrder,
        sortKey: sortKey,
        perPage: page.perPage,
        pageActive: currentPage,
      });

      setBooks(list);
      setPage(pageData);
    }
  }, [
    searchKey,
    currentPage,
    checkBooks,
    sortOrder,
    sortKey,
    page.perPage,
    checkParams,
  ]);

  useEffect(() => {
    const queryPage = searchParams.get("page") || 1;
    const queryBook = searchParams.get("query") || "";
    const querySearchKey = searchParams.get("searchKey") || "name";
    const querySortOrder = searchParams.get("sortOrder") || "asc";
    const queryPerPage = searchParams.get("perPage") || 3;

    setCurrentPage(parseInt(queryPage, 10));
    setCheckBooks(queryBook);
    setNewBook(queryBook);
    setSearchKey(querySearchKey);
    setSortOrder(querySortOrder);
    setPage((prevPage) => ({
      ...prevPage,
      pageActive: parseInt(queryPage, 10),
      perPage: parseInt(queryPerPage, 10),
    }));

    setCheckParams(true);
  }, [searchParams]);

  const goToPage = (pageNumber, searchKey, newBook, sortOrder, perPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", pageNumber || 1);
    newParams.set("searchKey", searchKey);
    newParams.set("query", newBook);
    newParams.set("sortOrder", sortOrder);
    newParams.set("perPage", perPage);
    setSearchParams(newParams);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewBook(value);
  };

  const handleSearch = () => {
    setCheckBooks(newBook);

    goToPage(1, searchKey, newBook, sortOrder, page.perPage);
  };

  const handleDeleteBook = (index) => {
    const copyBooks = [...books];
    copyBooks.splice(index, 1);
    setBooks(copyBooks);
  };

  const handleSearchKeyChange = (event) => {
    let newSearchKey = event.target.value;
    setSearchKey(newSearchKey);
    goToPage(1, newSearchKey, newBook, sortOrder, page.perPage);
  };

  const handlePerPageChange = (event) => {
    let newPerPage = parseInt(event.target.value, 10);
    setPage({
      totalPage: page.perPage,
      pageActive: page.pageActive,
      perPage: newPerPage,
    });
    setCurrentPage(1);
    goToPage(1, searchKey, newBook, sortOrder, newPerPage);
  };

  const handleSort = (key) => {
    let newSortOrder = "asc";
    if (sortKey === key) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      setSortKey(key);
    }
    setSortOrder(newSortOrder);
    goToPage(currentPage, searchKey, newBook, newSortOrder, page.perPage);
  };

  const getSortIcon = (key) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? (
      <i className="fas fa-arrow-up"></i>
    ) : (
      <i className="fas fa-arrow-down"></i>
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

 const handleAddBook = () => {
  const newItem = { name: name, author: author, SX: year };
  addDataToList(newItem,books);
  console.log(22222222)
 }
  return (
    <div className="table-container">
      <h1>Các loại sách</h1>
      <Search
        newBook={newBook}
        handleInputChange={handleInputChange}
        handleSearchKeyChange={handleSearchKeyChange}
        handleKeyPress={handleKeyPress}
        handleSearch={handleSearch}
        searchKey={searchKey}
      />

      <Table
        handleSort={handleSort}
        getSortIcon={getSortIcon}
        books={books}
        handleDeleteBook={handleDeleteBook}
      />
    <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên sách"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Nhập tên tác giả"
        />
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Nhập năm sản xuất"
        />
        <button onClick={handleAddBook}>Thêm sách</button>
      </div>
      <div className="Pagination">
        <Pagination
          totalPages={page.totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          goToPage={goToPage}
          searchKey={searchKey}
          sortOrder={sortOrder}
          newBook={newBook}
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

export default App;
