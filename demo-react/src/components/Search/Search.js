import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./search.css";
const Search = ({
  newBook,
  handleInputChange,
  handleSearchKeyChange,
  handleKeyPress,
  handleSearch,
  searchKey,
}) => {
  return (
    <div className="add">
      <input
        type="text"
        value={newBook}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Nhập sách"
      ></input>
      <select value={searchKey} onChange={handleSearchKeyChange}>
        <option value="name">Tìm kiếm theo tên</option>
        <option value="SX">Tìm kiếm theo năm phát hành</option>
      </select>
      <button className="btnSearch" onClick={handleSearch}>
      <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default Search;
