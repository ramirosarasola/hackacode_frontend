import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TicketsTableData from './TicketsTableData';
import { getTickets, deleteTicket, updateTicket } from '../../slices/ticketSlice';
import '../../styles/pages/Tickets.css';

const Tickets = () => {
  const tickets = useSelector((state) => state.tickets.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  const handleDeleteTicket = (index) => {
    const ticketId = tickets[index]._id
    dispatch(deleteTicket(ticketId))
  };

  const handleUpdateTicket = (index, updatedTicket) => {
    console.log(index);
    const ticket = tickets[index];
    if (ticket) {
      const ticketData = { ...updatedTicket }
      console.log(ticketData);
      const id = ticket._id;
      dispatch(updateTicket({ id, ticketData }));
    }
  };

  return (
    <div className="tickets__container">
      <h1>Tickets</h1>
      <TicketsTableData
        tickets={tickets}
        onDeleteTicket={handleDeleteTicket}
        onUpdateTicket={handleUpdateTicket}
      />
      {/* <button onClick={handleCreateTicket}>Create Ticket</button> */}
    </div>
  );
};

export default Tickets;
