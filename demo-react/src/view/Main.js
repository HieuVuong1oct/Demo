import React, { useState, useEffect } from "react";
import "./App.css";
import Pagination from "../components/Pagination/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResults from "../components/Search/SearchResults";
import {  useSearchParams } from "react-router-dom";
import { getData } from "../api";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
function Main() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("name");
  const [page, setPage] = useState({ totalPage: 0, pageActive: 1, perPage: 3 });
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [sortKey, setSortKey] = useState("SX");
  const [searchParams, setSearchParams] = useSearchParams();

  const goToPage = (pageNumber) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", pageNumber || 1);
    newParams.set("query", newBook);
    setSearchParams(newParams);
  };

  useEffect(() => {
    const queryPage = searchParams.get("page");
    const queryBook = searchParams.get("query");

    if (queryPage && parseInt(queryPage, 10) !== currentPage) {
      setCurrentPage(parseInt(queryPage, 10));
    }
    if (queryBook && queryBook !== newBook) {
      setNewBook(queryBook);
    }
  }, [searchParams]);

  const handleSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", 1);
    newParams.set("query", newBook);
    setSearchParams(newParams);

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
  
  };
  const handleDeleteBook = (index) => {
    const copyBooks = [...books];
    copyBooks.splice(index, 1);
    setBooks(copyBooks);
  };

  const handleSearchKeyChange = (event) => {
    setSearchKey(event.target.value);
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
  }, [searchKey, currentPage,sortOrder,sortKey]);
  console.log(books);

  const handleSort = (key) => {
    if (sortKey === key) {
      
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
     
      setSortKey(key);
      setSortOrder("asc");
    }
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
      <div className="add">
        <input
          type="text"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          placeholder="Nhập sách"
        ></input>
        <select onChange={handleSearchKeyChange}>
          <option value="name">Tìm kiếm theo tên</option>
          <option value="SX">Tìm kiếm theo năm phát hành</option>
        </select>
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>
      <div className="sort">
       
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Sách</th>
            <th>Tác giả</th>
            <th onClick={() => handleSort("SX")}>
              Năm phát hành {getSortIcon("SX")}
            </th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <SearchResults
            itemPage={books || []}
            handleDeleteBook={handleDeleteBook}
          />
        </tbody>
      </table>
      <Pagination
        totalPages={page.totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        goToPage={goToPage}
      />
    </div>
  );
}

export default Main;
