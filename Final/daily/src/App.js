import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import './App.css';
import WordOfTheDay from './components/WordOfTheDay';
import DictionarySearch from './components/DictionarySearch';
import HistoryFavorites from './components/HistoryFavorites';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<WordOfTheDay />} />
          <Route path="/word-of-the-day" element={<WordOfTheDay />} />
          <Route path="/dictionary-search" element={<DictionarySearch />} />
          <Route path="/history-favorites" element={<HistoryFavorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
