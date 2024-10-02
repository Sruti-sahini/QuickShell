import React, { useState } from 'react';
import './styles.css';

const Navbar = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
    setShowDropdown(false);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setShowDropdown(false);
  };

  return (
    <nav style={{ width: '100%', padding: '10px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <button className="display-button" onClick={() => setShowDropdown(!showDropdown)}>
        <img src="/icons/Display.png" alt="Display Icon" className="icon" />
        Display
      </button>

      {showDropdown && (
        <div className="dropdown">
          <div className="dropdown-item">
            <label className="dropdown-label">Grouping: </label>
            <select className="grouping" onChange={handleGroupChange} value={groupBy}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="dropdown-item">
            <label className="dropdown-label">Sorting: </label>
            <select classMName="sorting" onChange={handleSortChange} value={sortBy}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

