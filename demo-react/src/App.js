import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './view/Main';


const App = () => {
  return (
    <Router>
      <div>
        <Main />
       
      </div>
    </Router>
  );
};

export default App;