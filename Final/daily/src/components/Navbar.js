import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="flex justify-center space-x-4">
        <Link to="/word-of-the-day" className="nav-item hover:-translate-y-1 transition-transform duration-300">Word of the Day</Link>
        <Link to="/dictionary-search" className="nav-item hover:-translate-y-1 transition-transform duration-300">Dictionary Search</Link>
        <Link to="/history-favorites" className="nav-item hover:-translate-y-1 transition-transform duration-300">History/Favorites</Link>
      </div>
    </nav>
  );
};

export default Navbar;
