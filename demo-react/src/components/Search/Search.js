import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './search.css'
const Search = ({newBook, handleInputChange, handleSearchKeyChange,handleKeyPress, handleSearch}) => {
    return(
        <div className="add">
        <input
          type="text"
          value={newBook}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
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