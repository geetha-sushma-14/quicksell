import React, { useState, useEffect } from 'react';
import Card from './card.js';
import Navbar from './navbar.js';
import './App.css';
// Importing icons
import IconBacklog from './images/Backlog.svg';
import IconTodo from './images/To-do.svg';
import IconInProgress from './images/in-progress.svg';
import IconDone from './images/Done.svg';
import IconCancelled from './images/Cancelled.svg';
import IconNoPriority from './images/No-priority.svg';
import IconUrgent from './images/SVG - Urgent Priority colour.svg';
import IconHigh from './images/Img - High Priority.svg';
import IconMedium from './images/Img - Medium Priority.svg';
import IconLow from './images/Img - Low Priority.svg';
import IconRight1 from './images/add.svg';
import IconRight2 from './images/3 dot menu.svg';

const TicketBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => localStorage.getItem('grouping') || 'status');
  const [ordering, setOrdering] = useState(() => localStorage.getItem('ordering') || 'priority');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setTickets(result.tickets);
        setUsers(result.users);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Saving grouping and ordering to localStorage
  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem('ordering', ordering);
  }, [ordering]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Organizing the tickets based on selected grouping
  let groupedTickets;
  const statusIcons = {
    backlog: IconBacklog,
    todo: IconTodo,
    inProgress: IconInProgress,
    done: IconDone,
    cancelled: IconCancelled,
  };

  const priorityIcons = {
    'No Priority': IconNoPriority,
    Urgent: IconUrgent,
    High: IconHigh,
    Medium: IconMedium,
    Low: IconLow,
  };

  if (grouping === 'status') {
    groupedTickets = {
      backlog: tickets.filter(ticket => ticket.status === 'Backlog'),
      todo: tickets.filter(ticket => ticket.status === 'Todo'),
      inProgress: tickets.filter(ticket => ticket.status === 'In progress'),
      done: tickets.filter(ticket => ticket.status === 'Done'),
      cancelled: tickets.filter(ticket => ticket.status === 'Cancelled'),
    };
  } else if (grouping === 'users') {
    groupedTickets = users.reduce((acc, user) => {
      acc[user.name] = tickets.filter(ticket => ticket.userId === user.id);
      return acc;
    }, {});
  } else if (grouping === 'priority') {
    groupedTickets = {
      'No Priority': tickets.filter(ticket => ticket.priority === 0),
      Urgent: tickets.filter(ticket => ticket.priority === 4),
      High: tickets.filter(ticket => ticket.priority === 3),
      Medium: tickets.filter(ticket => ticket.priority === 2),
      Low: tickets.filter(ticket => ticket.priority === 1),
    };
  }

  // Sorting tickets based on selected ordering
  const sortTickets = ticketsToSort => {
    if (ordering === 'priority') {
      return ticketsToSort.sort((a, b) => b.priority - a.priority);
    } else if (ordering === 'title') {
      return ticketsToSort.sort((a, b) => a.title.localeCompare(b.title));
    }
    return ticketsToSort;
  };

  // Applying sorting to each group
  for (const group in groupedTickets) {
    groupedTickets[group] = sortTickets(groupedTickets[group]);
  }

  return (
    <div>
      <Navbar 
        grouping={grouping} 
        ordering={ordering} 
        onGroupingChange={setGrouping} 
        onOrderingChange={setOrdering} 
      />

      {/* Ticket Board */}
      <div className="board">
        {Object.entries(groupedTickets).map(([group, ticketsInGroup]) => (
          <div key={group} className="ticket-column">
            <div className="ticket-header">
              {/* Status grouping */}
              <div className="ticket-title">
                {grouping === 'status' ? (
                  <>
                    <img src={statusIcons[group]} alt={`${group} icon`} className="icon" />
                    <span>{group}</span>
                  </>
                ) : grouping === 'priority' ? (
                  // Priority grouping
                  <>
                    <img src={priorityIcons[group]} alt={`${group} icon`} className="icon" />
                    <span>{group}</span>
                  </>
                ) : (
                  // Users grouping (no icon)
                  <span>{group}</span>
                )}
                <span className="ticket-count">{ticketsInGroup.length}</span>
              </div>
              <div className="ticket-actions">
                <img src={IconRight1} alt="Action icon 1" className="icon-action" />
                <img src={IconRight2} alt="Action icon 2" className="icon-action" />
              </div>
            </div>
            {ticketsInGroup.length === 0 ? (
              <p>No tickets</p>
            ) : (
              ticketsInGroup.map(ticket => <Card key={ticket.id} ticket={ticket} />)
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default TicketBoard;

