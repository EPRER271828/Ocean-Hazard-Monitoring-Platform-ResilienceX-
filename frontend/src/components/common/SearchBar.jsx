import React, { useState } from 'react';
import { useMap } from '../../hooks/useMapbox';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchLocations } = useMap();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 2) {
      searchLocations(value);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search locations, hazards..."
      />
      <span className="search-icon">🔍</span>
    </div>
  );
};

export default SearchBar;