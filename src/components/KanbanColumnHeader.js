import React from 'react';
import '../styles.css';

const KanbanColumnHeader = ({ groupKey, icon, ticketCount }) => {
  return (
    <div className="column-header">
      {icon && <img src={icon} alt={groupKey} className="icon" />}
      <span className="column-name">{groupKey}</span>
      <span className="ticket-count">{ticketCount}</span>
      <img src="/icons/add.png" alt="Add" className="add-icon" />
      <img src="/icons/3_dot_menu.png" alt="More Options" className="more-icon" />
    </div>
  );
};

export default KanbanColumnHeader;
