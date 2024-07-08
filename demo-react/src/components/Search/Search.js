import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Search = ({newBook, setNewBook, handleSearchKeyChange, handleSearch}) => {
    return(
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
        <button className="btnSearch" onClick={handleSearch}>Tìm kiếm</button>
      </div>
    )
}

export default Search;