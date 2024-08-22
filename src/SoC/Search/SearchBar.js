import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div class="search-box">
      <form onSubmit={handleSearch} name="search-box">
        <input type="text" class="search-input" name="txt" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Link to={'./search'}>
        <FaSearch className='search-icon' />
      </Link>
    </div>
  );
};

export default SearchBar;
