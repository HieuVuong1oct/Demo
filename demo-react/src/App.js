import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './view/Main';
import SearchResults from './components/Search/SearchResults';

const App = () => {
  return (
    <Router>
      <div>
        <Main />
        <Routes>
          <Route path="/search" element={<SearchResults />} />
          {/* Các route khác */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;