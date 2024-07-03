
import { useState } from 'react';
import './App.css';
import Pagination from './components/Pagination/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  const ListData = [
    { name:'Toán', author : 'BGD', SX:'2022' },
    { name:'Toán 2', author : 'BGD', SX:'2023' },
    { name:'Toán 3', author : 'BGD', SX:'2024' },
    { name:'Văn', author : 'BGD', SX:'2022' },
    { name:'Văn 2', author : 'BGD', SX:'2023' },
    { name:'Văn 3', author : 'BGD', SX:'2024' },
    { name:'Anh', author : 'BGD', SX:'2022' },
    { name:'Anh 2', author : 'BGD', SX:'2023' },
    { name:'Anh 3', author : 'BGD', SX:'2024' },
    { name:'Lí', author : 'BGD', SX:'2024' },
    { name:'Hóa', author : 'BGD', SX:'2024' },
    { name:'Sinh', author : 'BGD', SX:'2024' },
    { name:'Sử', author : 'BGD', SX:'2024' },
    { name:'Địa', author : 'BGD', SX:'2024' },
    { name:'Công nghệ', author : 'BGD', SX:'2024' },
    { name:'Công dân', author : 'BGD', SX:'2024' },

  ];
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
 


  // const handleAddBook = () => {
  //   if(newBook.trim()){
  //     setBooks([...books, newBook]);
  //     setNewBook('');
  //   }
  // };

  const handleDeleteBook = (index) => {
    const copyBooks = [...books];
    copyBooks.splice(index,1);
    setBooks(copyBooks);
  }

  const handleSearchBook = () => {
    const results = ListData.filter(item => 
      item.name.toLowerCase().includes(newBook.toLowerCase()))
      setBooks(results);
      setCurrentPage(1);
  }

const paginateBooks = () => {
  
  const indexOfFirstItem = (currentPage-1)*itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  return books.slice(indexOfFirstItem,indexOfLastItem);
}
 

  
  return (
    <div  className="table-container">
      <h1>Các loại sách</h1>
      <div className='add'>
    <input
        type="text"
        value={newBook}
        onChange={(e) => setNewBook(e.target.value)}
        placeholder="Nhập sách"
      >
      </input>
      {/* <button onClick={handleAddBook}>Thêm sách</button> */}
      <button onClick={handleSearchBook}>Tìm kiếm</button>
    </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Sách</th>
            <th>Tác giả</th>
            <th>Năm phát hành</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {paginateBooks().map((item, index) => (
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
        </tbody>
      </table>
    
      
      
      <Pagination 
          totalItems={books.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
