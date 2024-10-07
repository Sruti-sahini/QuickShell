import React, { useState, useEffect } from 'react';
import './styles.css';

const Navbar = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Load saved grouping and sorting preferences from localStorage
  useEffect(() => {
    const savedGroupBy = localStorage.getItem('groupBy');
    const savedSortBy = localStorage.getItem('sortBy');
    if (savedGroupBy) {
      setGroupBy(savedGroupBy);
    }
    if (savedSortBy) {
      setSortBy(savedSortBy);
    }
  }, [setGroupBy, setSortBy]);

  // Save groupBy to localStorage when changed
  const handleGroupChange = (e) => {
    const newGroupBy = e.target.value;
    setGroupBy(newGroupBy);
    localStorage.setItem('groupBy', newGroupBy);
    setShowDropdown(false);
  };

  // Save sortBy to localStorage when changed
  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    localStorage.setItem('sortBy', newSortBy);
    setShowDropdown(false);
  };

  return (
    <nav
      style={{
        width: '100%',
        padding: '10px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <button
        className="display-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img src="/icons/Display.png" alt="Display Icon" className="icon" />
        Display
      </button>

      {showDropdown && (
        <div className="dropdown">
          <div className="dropdown-item">
            <label className="dropdown-label">Grouping: </label>
            <select
              className="grouping"
              onChange={handleGroupChange}
              value={groupBy}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="dropdown-item">
            <label className="dropdown-label">Sorting: </label>
            <select
              className="sorting"
              onChange={handleSortChange}
              value={sortBy}
            >
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