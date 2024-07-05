import React from 'react';



const SearchResults = ({itemPage=[], handleDeleteBook}) => {
  
  return (
    
       <>
          {itemPage.map((item, index) => (
            <tr key={index}>
              <td>{index +1 }</td>
              <td>{item.name}</td>
              <td>{item.author}</td>
              <td>{item.SX}</td>
              <td>
              <button className="add-button" onClick={() => handleDeleteBook(index)}>Xóa sách</button>
              </td>
            </tr>
            
          ))}
        </>
    
  );
};

export default SearchResults;