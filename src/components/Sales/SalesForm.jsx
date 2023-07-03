import React, { useState, useEffect } from "react";
import "../../styles/components/Sales/SalesForm.css";
import { useDispatch, useSelector } from "react-redux";
import { newSale } from "../../slices/salesSlice";
import { fetchCustomers } from "../../slices/customerSlice";
import { createTicket } from "../../slices/ticketSlice";
import { getGames } from "../../slices/gameSlice";
import { Alert } from "../UI/alert";

const SalesForm = () => {
  const { customers } = useSelector((state) => state.customers);
  const { games } = useSelector((state) => state.games);
  const [gameAmount, setGameAmount] = useState([1]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(getGames());
  }, [dispatch]);

  const ticket = {
    customerId: "",
    gameId: "",
    ticketAmount:1
  };

  const [formData, setFormData] = useState([ticket]);
  console.log(formData);

  const onChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData[0].customerId) {
      Alert("warning","Please select a customer before entering a game");
      return;
    }

    const ticketsToSale = formData.flatMap((item) => {
      const tickets = [];
      for (let i = 0; i < item.ticketAmount; i++) {
        const createTicketPromise = dispatch(
          createTicket({
            customerId: item.customerId,
            gameId: item.gameId,
          })
        );
        tickets.push(createTicketPromise);
      }
      return tickets;
    });

    try {
      const createdTickets = await Promise.all(ticketsToSale);
      const tickets = createdTickets.map((ticket) => ticket.payload.data._id);

      console.log(tickets);
      dispatch(newSale({tickets}))
      setFormData([ticket]);
    } catch (error) {
      console.error("Error creating tickets:", error);
    }
  };

  const handleAddGame = () => {
    setGameAmount([...gameAmount, 1]);
    setFormData([...formData, ticket]);
  };

  const handleRemoveGame = (index) => {
    const updatedGameAmount = [...gameAmount];
    if (gameAmount.length !== 1) {
      updatedGameAmount.splice(index, 1);
      setGameAmount(updatedGameAmount);
    } else {
      console.log("no puedes eliminar todos");
    }

    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  const NewSaleForm = ({ index }) => {
    const { customerId, gameId, ticketAmount } = formData[index] || [];
    const [selectedGame, setSelectedGame] = useState(null);
  
    const handleGameChange = (e) => {
      const { value } = e.target;
      const selectedGame = games.find((game) => game._id === value);
  
      const updatedFormData = [...formData];
      updatedFormData[index] = {
        ...updatedFormData[index],
        customerId: formData[0].customerId,
        gameId: value,
      };
      setFormData(updatedFormData);
  
      setSelectedGame(selectedGame);
    };
  
    const handleTicketAmountChange = (e) => {
      const { value } = e.target;
      const updatedFormData = [...formData];
      updatedFormData[index] = {
        ...updatedFormData[index],
        ticketAmount: parseInt(value),
      };
      setFormData(updatedFormData);
    };
  
    useEffect(() => {
      if (selectedGame) {
        const totalPrice = selectedGame.price * ticketAmount;
        const updatedFormData = [...formData];
        updatedFormData[index] = {
          ...updatedFormData[index],
          total: totalPrice,
        };
        setFormData(updatedFormData);
      }
    }, [selectedGame, ticketAmount]);
  
    const isCustomerSelected = !!formData[0]?.customerId;
    const isGameDisabled = !isCustomerSelected;
  
    return (
      <div className="sale-data-inputs">
        <label className="sale-data-label">
          Game
          <select
            name="gameId"
            value={gameId}
            onChange={handleGameChange}
            disabled={isGameDisabled}
          >
            <option value="">Select a Game</option>
            {games?.map((game, i) => (
              <option key={i} value={game._id}>
                {game.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount of tickets
          <input
            className="input_ticket"
            type="number"
            name="ticketAmount"
            value={ticketAmount}
            onChange={(e) => handleTicketAmountChange(e)}
            disabled={isGameDisabled}
          />
        </label>
        
        <label>
          Total
          <input
            disabled
            type="number"
            name="total"
            value={
              formData[index]?.gameId
                ? games.find((game) => game._id == formData[index].gameId).price *
                  ticketAmount
                : 0
            }
          />
        </label>
        <button className="addSale" onClick={handleAddGame}>
          +
        </button>
        <button
          className="removeSale"
          onClick={() => handleRemoveGame(index)}
          disabled={!isCustomerSelected}
        >
          -
        </button>
      </div>
    );
  };

  return (
    <form className="sales__form" onSubmit={onSubmit}>
      <h2>Register Sale</h2>
      <div className="sales__form__container">
        <fieldset className="sales__customer--info">
          <legend>Customer Information</legend>
          <label>Customer</label>
          <select
            name="customerId"
            value={formData[0]?.customerId}
            onChange={(e) => onChange(e, 0)}
          >
            <option value="">Select a customer</option>
            {/* Iterate over customers and create an option for each */}
            {customers.map((customer, i) => (
              <option key={i} value={customer._id}>
                {customer.name} {customer.lastName}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="sales__sales--info">
          {gameAmount?.length > 0 &&
            gameAmount.map((game, i) => <NewSaleForm key={i} index={i} />)}
        </fieldset>
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default SalesForm;
