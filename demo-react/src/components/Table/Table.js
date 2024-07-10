import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResults from "../Search/SearchResults";
import "./table.css";
import { tableData } from "./constant";

const Table = ({ handleSort, getSortIcon, books, handleDeleteBook }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {tableData.map((item) => (
              <th
                key={item.id}
                onClick={item.sortable ? () => handleSort("SX") : null}
              >
                {item.name}{" "}
                {item.key === "year" && item.sortable && getSortIcon("SX")}{" "}
              </th>
            ))}
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
  );
};

export default Table;
