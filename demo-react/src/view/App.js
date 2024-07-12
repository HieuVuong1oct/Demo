import React, { useState, useEffect} from "react";
import "./App.css";
import Pagination from "../components/Pagination/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import { addData, updateData, deleteData, getData } from "../api";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Search from "../components/Search/Search";
import Table from "../components/Table/Table";
import PerPage from "../components/PerPage/PerPage";
import { DeleteBook } from "../components/Modal/deleteBook";
import { AddBook } from "../components/Modal/addBook";
import { UpdateBook } from "../components/Modal/updateBook";

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
  const [infoItem, setInfoItem] = useState({
    id: "",
    name: "",
    author: "",
    SX: "",
  });
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handleSearchKeyChange = (event) => {
    let newSearchKey = event.target.value;
    setSearchKey(newSearchKey);
    goToPage(1, newSearchKey, newBook, sortOrder, page.perPage);
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

  const handleEditBook = (item) => {
    toggleModalEdit();
    setInfoItem({
      id: item.id,
      name: item.name,
      author: item.author,
      SX: item.SX,
    });
    setCheckParams(false);
  };

  const handleUpdateBook = () => {
    
    toggleModalEdit();
    setCheckParams(true);
    const Item = {
      id: infoItem.id,
      name: infoItem.name,
      author: infoItem.author,
      SX: infoItem.SX,
    };
    updateData(infoItem.id, Item);
    setInfoItem({ name: "", author: "".author, SX: "" });
  };

  const closeModal = () => {
    toggleModalEdit();
    setInfoItem({ name: "", author: "".author, SX: "" });
  };

  const toggleModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };

  const handleDeleteBook = (item) => {
    deleteData(item.id);
    setCheckParams(false);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirm(false);
    setCheckParams(true);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const handleAdd = () => {
    setCheckParams(false);
    toggleModalAdd();
  };

  const handleAddBook = () => {
    
    const newItem = {
      name: infoItem.name,
      author: infoItem.author,
      SX: infoItem.SX,
    };
    toggleModalAdd();
    addData(newItem);
    setInfoItem({ name: "", author: "".author, SX: "" });
    setCheckParams(true);
  };

  const toggleModalAdd = () => {
    setShowModalAdd(!showModalAdd);
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
        handleEditBook={handleEditBook}
        handleDeleteBook={handleDeleteBook}
      />

      <DeleteBook
        showConfirm={showConfirm}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    
      <AddBook
        handleAdd={handleAdd}
        toggleModal={toggleModalAdd}
        showModal={showModalAdd}
        handleAddBook={handleAddBook}
        infoItem={infoItem}
        setInfoItem={setInfoItem}
      />

      <UpdateBook
        showModal={showModalEdit}
        handleUpdateBook={handleUpdateBook}
        infoItem={infoItem}
        setInfoItem={setInfoItem}
        closeModal={closeModal}
      />

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
