import React from 'react';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import './App.css';
import Dashboard from './features/home/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
