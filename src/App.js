import React, { useState } from 'react';
import Navbar from './Navbar';
import KanbanBoard from './components/KanbanBoard';
import './styles.css';

const App = () => {
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  return (
    <div className="app-container">
      <Navbar groupBy={groupBy} setGroupBy={setGroupBy} sortBy={sortBy} setSortBy={setSortBy} />
      <KanbanBoard groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
};

export default App;
