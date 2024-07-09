import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './perpage.css'
const PerPage = ({perPage, handlePerPageChange}) => {
    return (
        <>
          <select className= "select" value={perPage} onChange={handlePerPageChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        </>
    )
}

export default PerPage;