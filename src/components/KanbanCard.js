import React from 'react'; 

// KanbanCard component
const KanbanCard = ({ ticket, groupBy }) => {
    // Function to get the image path for priority
    const getPriorityIcon = (priority) => {
        const priorityIcons = {
            4: '/icons/Urgent.png',
            3: '/icons/HighPriority.png',
            2: '/icons/MediumPriority.png',
            1: '/icons/Low Priority.png',
            0: '/icons/No-priority.png',
        };
        return priorityIcons[priority] || '/icons/No-priority.png';
    };

    // Function to get the image path for status
    const getStatusIcon = (status) => {
        const statusIcons = {
            Todo: '/icons/To-do.png',
            Backlog: '/icons/Backlog.png',
            'In progress': '/icons/in-progress.png',
            Done: '/icons/Done.png',
            Cancelled: '/icons/Cancelled.png',
        };
        return statusIcons[status] || null;
    };

    return (
        <div className="kanban-card">
            {/* User Icon on the top right, only display if not grouped by user */}
            {groupBy !== 'user' && (
                <img src="/icons/user.png" alt="User" className="user-icon" />
            )}

            <h3>{ticket.id}</h3>
            <h4>
                {/* Only display status icon if not grouped by status */}
                {groupBy !== 'status' && getStatusIcon(ticket.status) && (
                    <img src={getStatusIcon(ticket.status)} alt="Status" className="status-icon" />
                )}
                <span>
                    {ticket.title}
                </span>
            </h4>

            {/* <h7>{ticket.priority}</h7> */}
            <div className="tag-container">
                {ticket.tag.map((tag, index) => (
                    <div key={index} className="tag-item">
                        {/* Display priority icon unless grouped by priority */}
                        {groupBy !== 'priority' && (
                            <img src={getPriorityIcon(ticket.priority)} alt="Priority" className="priority-icon" />
                        )}
                        <span className="tag-text">{tag}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanCard;
