import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pagination.css'
const Pagination = ({totalPages, currentPage, setCurrentPage, goToPage}) => {

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        goToPage(pageNumber);
    }

    return (
        <div >
            <button
                onClick={() => handleClick(currentPage-1)}
                disabled={currentPage===1}
            >
                Previous
            </button>
            {[...Array(totalPages)].map((_, index)=> (
                <button 
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => handleClick(index+1)}
                
                >
                    {index+1}
                    
                </button>
            ))}
            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination