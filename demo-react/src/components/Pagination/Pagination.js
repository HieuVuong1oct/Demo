import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Pagination = ({totalItems, itemsPerPage, currentPage, setCurrentPage, goToPage}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

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
                onClick={() => handleClick(index+1)}
                
                >
                    {index+1}
                    
                </button>
            ))}
            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination