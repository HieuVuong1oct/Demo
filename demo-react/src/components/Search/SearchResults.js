import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./search.css";

const SearchResults = ({ itemPage = [], handleEditBook, handleDeleteBook }) => {
  return (
    <>
      {itemPage.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.author}</td>
          <td>{item.SX}</td>
          <td>
            <button className="add-button" onClick={() => handleEditBook(item)}>
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="add-button"
              onClick={() => handleDeleteBook(item)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default SearchResults;
