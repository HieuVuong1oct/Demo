import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResults from "../Search/SearchResults";
const Table = ({handleSort, getSortIcon, books, handleDeleteBook}) => {
    return (
        <>
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
        </>
    )
}

export default Table;