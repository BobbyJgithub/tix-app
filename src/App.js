import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import EventDetails from './pages/EventDetails/EventDetails';
import AttractionDetails from './pages/AttractionDetails/AttractionDetails';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/attraction/:id" element={<AttractionDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;