import React, { useEffect, useState } from 'react';
import KanbanCard from './KanbanCard';
import KanbanColumnHeader from './KanbanColumnHeader';
import { fetchTicketsAndUsers } from '../utils/api'; // Import the API function
import '../styles.css';

const KanbanBoard = ({ groupBy, sortBy }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTicketsAndUsers().then(({ tickets, users }) => {
      setTickets(tickets);
      setUsers(users);
    });
  }, []);

  const sortTickets = (tickets, sortBy) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupTickets = (tickets, groupBy, users) => {
    let groupedTickets = {};
    if (groupBy === 'status') {
      groupedTickets = {
        Backlog: [],
        Todo: [],
        'In progress': [],
        Done: [],
        Cancelled: [],
      };
      tickets.forEach((ticket) => {
        groupedTickets[ticket.status].push(ticket);
      });
    } else if (groupBy === 'user') {
      const userMap = users.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});

      groupedTickets = users.reduce((acc, user) => {
        acc[user.name] = [];
        return acc;
      }, {});

      tickets.forEach((ticket) => {
        const userName = userMap[ticket.userId] || 'Unknown User';
        groupedTickets[userName].push(ticket);
      });
    } else if (groupBy === 'priority') {
      const priorityLabels = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No Priority',
      };
      groupedTickets = {
        Urgent: [],
        High: [],
        Medium: [],
        Low: [],
        'No Priority': [],
      };
      tickets.forEach((ticket) => {
        const priorityLabel = priorityLabels[ticket.priority] || 'Unknown Priority';
        groupedTickets[priorityLabel].push(ticket);
      });
    }
    return groupedTickets;
  };

  const groupedTickets = groupTickets(tickets, groupBy, users);
  const sortedGroupedTickets = Object.keys(groupedTickets).reduce((acc, key) => {
    acc[key] = sortTickets(groupedTickets[key], sortBy);
    return acc;
  }, {});

  const getIcon = (groupKey) => {
    if (groupBy === 'status') {
      const statusIcons = {
        Backlog: '/icons/Backlog.png',
        Todo: '/icons/To-do.png',
        'In progress': '/icons/in-progress.png',
        Done: '/icons/Done.png',
        Cancelled: '/icons/Cancelled.png',
      };
      return statusIcons[groupKey] || null;
    }
    if (groupBy === 'user') {
      return '/icons/user.png';
    }
    if (groupBy === 'priority') {
      const priorityIcons = {
        'No Priority': '/icons/No-priority.png',
        Urgent: '/icons/Urgent.png',
        High: '/icons/HighPriority.png',
        Medium: '/icons/MediumPriority.png',
        Low: '/icons/Low Priority.png',
      };
      return priorityIcons[groupKey] || null;
    }
    return null;
  };

  return (
    <div className="kanban-board">
      {Object.keys(sortedGroupedTickets).map((groupKey) => (
        <div className="kanban-column" key={groupKey}>
          <KanbanColumnHeader
            groupKey={groupKey}
            icon={getIcon(groupKey)}
            ticketCount={sortedGroupedTickets[groupKey].length}
          />
          {sortedGroupedTickets[groupKey].map((ticket) => (
            <KanbanCard key={ticket.id} ticket={ticket} groupBy={groupBy} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;


