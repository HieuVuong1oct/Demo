import React, { useState, useEffect } from "react";
import "./App.css";
import Pagination from "../components/Pagination/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResults from "../components/Search/SearchResults";
import { useNavigate, useLocation } from "react-router-dom";
import { getData } from "../api";

function Main() {
  const ListData = [
    { name: "Toán", author: "BGD", SX: "2022" },
    { name: "Toán 2", author: "BGD", SX: "2023" },
    { name: "Toán 3", author: "BGD", SX: "2024" },
    { name: "Toán 4", author: "BGD", SX: "2024" },
    { name: "Toán 5", author: "BGD", SX: "2024" },
    { name: "Toán 6", author: "BGD", SX: "2024" },
    { name: "Toán 7", author: "BGD", SX: "2024" },
    { name: "Toán 8", author: "BGD", SX: "2024" },
    { name: "Toán 9", author: "BGD", SX: "2024" },
    { name: "Toán 10", author: "BGD", SX: "2024" },
    { name: "Toán 11", author: "BGD", SX: "2024" },
    { name: "Toán 12", author: "BGD", SX: "2024" },
    { name: "Toán ĐH", author: "BGD", SX: "2024" },
    { name: "Toán CC", author: "BGD", SX: "2024" },
    { name: "Toán NC", author: "BGD", SX: "2024" },
    { name: "Văn", author: "BGD", SX: "2022" },
    { name: "Văn 2", author: "BGD", SX: "2023" },
    { name: "Văn 3", author: "BGD", SX: "2024" },
    { name: "Anh", author: "BGD", SX: "2022" },
    { name: "Anh 2", author: "BGD", SX: "2023" },
    { name: "Anh 3", author: "BGD", SX: "2024" },
    { name: "Lí", author: "BGD", SX: "2024" },
    { name: "Hóa", author: "BGD", SX: "2024" },
    { name: "Sinh", author: "BGD", SX: "2024" },
    { name: "Sử", author: "BGD", SX: "2024" },
    { name: "Địa", author: "BGD", SX: "2024" },
    { name: "Công nghệ", author: "BGD", SX: "2024" },
    { name: "Công dân", author: "BGD", SX: "2024" },
  ];

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const goToPage = (pageNumber) => {
    query.set("page", pageNumber || 1);
    query.set("query", newBook);
    navigate(`/search?${query.toString()}`);
  };

  useEffect(() => {
    const queryPage = query.get("page");
    const queryBook = query.get("query");
    if (queryPage) {
      setCurrentPage(parseInt(queryPage, 10));
    }
    if (queryBook) {
      setNewBook(queryBook);
      const results = ListData.filter((item) =>
        item.name.toLowerCase().includes(queryBook.toLowerCase())
      );
      setBooks(results);
    }
  }, []);

  const handleDeleteBook = (index) => {
    const copyBooks = [...books];
    copyBooks.splice(index, 1);
    setBooks(copyBooks);
  };

  const handleSearchBook = () => {
    const results = ListData.filter((item) =>
      item.name.toLowerCase().includes(newBook.toLowerCase())
    );
    setBooks(results);

    const totalPages = Math.ceil(results.length / itemsPerPage);
    const newCurrentPage = currentPage > totalPages ? totalPages : currentPage;
    setCurrentPage(newCurrentPage);

    goToPage(newCurrentPage);
  };

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const itemPage = books.slice(indexOfFirstItem, indexOfLastItem);

  console.log(
    getData({
      searchKey: "name",
      searchValue: "Toán",
      sortBy: "asc",
      sortKey: "SX",
      perPage: 5,
      pageActive: 2,
    })
  );
  getData({
    searchKey: "name",
    searchValue: "Toán",
    sortBy: "asc",
    sortKey: "SX",
    perPage: 5,
    pageActive: 2,
  });

  // init page => khởi tạo dữ liệu theo url => useEffect để sau khi láy hết dữ liệu từ url thì get list init về

  // các hàm xử lý phân trang, chọn perpage, di chuyển giữa các page => vẫn gọi API

  // khi bấm nút search => call API

  // khi sort thì call API

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
        <button onClick={handleSearchBook}>Tìm kiếm</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Sách</th>
            <th>Tác giả</th>
            <th>Năm phát hành</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <SearchResults
            itemPage={itemPage || []}
            handleDeleteBook={handleDeleteBook}
          />
        </tbody>
      </table>

      <Pagination
        totalItems={books.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        goToPage={goToPage}
      />
    </div>
  );
}

export default Main;
