import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TicketsTableData from './TicketsTableData';
import { getTickets, deleteTicket, updateTicket } from '../../slices/ticketSlice';
import '../../styles/pages/Tickets.css';

const Tickets = () => {
  const tickets = useSelector((state) => state.tickets.tickets);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { employees } = useSelector((state) => state.employees);
  console.log(employees);
  console.log(user);

  const employeeType = employees.find(
    (employee) => employee.user === user.data?._id
  )?.type;

  const userRole = user.data?.role;
  console.log(employeeType);
  console.log(userRole);

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
        userRole={userRole}
        employeeType={employeeType}
      />
      {/* <button onClick={handleCreateTicket}>Create Ticket</button> */}
    </div>
  );
};

export default Tickets;
