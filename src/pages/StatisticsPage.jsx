import { useState, useEffect } from "react";
import "../styles/pages/StatisticsPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ticketsForGamesByDate,
  gameWithMoreTicketsToday,
  getGames,
} from "../slices/gameSlice";
import { totalProfitInADate, totalProfitInAMonth } from "../slices/saleSlice";
import { customerWithMoreTickets } from "../slices/customerSlice";
import { getTicketsByGameAndDate } from "../slices/ticketSlice";

function StatisticsPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [customerSelectedYear, setCustomerSelectedYear] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [customerSelectedMonth, setCustomerSelectedMonth] = useState("");
  const [date, setDate] = useState("");
  const tickets = useSelector((state) => state.games.tickets);
  const moreTicketsTodayGame = useSelector(
    (state) => state.games.moreTicketsTodayGame
  );
  const customer = useSelector((state) => state.customers.customer);
  const total = useSelector((state) => state.sales.total);
  const { games } = useSelector((state) => state.games);
  const { ticketsByGame } = useSelector((state) => state.tickets);
  const { totalInADate } = useSelector((state) => state.sales );

  useEffect(() => {
    dispatch(getGames());
    dispatch(gameWithMoreTicketsToday());
  }, []);

  const dispatch = useDispatch();

  const dateChangeHandler = (e) => {
    setSelectedDate(e.target.value);
  };

  const dateHandler = (e) => {
    setDate(e.target.value);
  };

  const gameChangeHandler = (e) => {
    setSelectedGame(e.target.value);
  };

  const saleDateHandler = (e) => {
    setSaleDate(e.target.value);
  };

  const onSubmitSaleDate = (e) => {
    e.preventDefault();
    const date = new Date(saleDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getUTCDate();

    dispatch(totalProfitInADate({ year, month, day }));
  };

  const onSubmitTicketsByDateAndGame = (e) => {
    e.preventDefault();
    const id = selectedGame;
    const dateForGame = new Date(date);

    const year = dateForGame.getFullYear();
    const month = dateForGame.getMonth() + 1;
    const day = dateForGame.getUTCDate();

    dispatch(getTicketsByGameAndDate({ year, month, day, id }));
  };

  const submitTicketsForGames = (e) => {
    e.preventDefault();
    const date = new Date(selectedDate);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getUTCDate();
    dispatch(ticketsForGamesByDate({ year, month, day }));
  };

  const monthChangeHandler = (e) => {
    setSelectedMonth(e.target.value);
  };

  const yearChangeHandler = (e) => {
    setSelectedYear(e.target.value);
  };

  const customerMonthChangeHandler = (e) => {
    setCustomerSelectedMonth(e.target.value);
  };

  const customerYearChangeHandler = (e) => {
    setCustomerSelectedYear(e.target.value);
  };

  const profitForSalesByMonthAndYear = (e) => {
    e.preventDefault();
    dispatch(totalProfitInAMonth({ month: selectedMonth, year: selectedYear }));
  };

  const submitCustomerWithMoreTickets = (e) => {
    e.preventDefault();
    dispatch(
      customerWithMoreTickets({
        month: customerSelectedMonth,
        year: customerSelectedYear,
      })
    );
  };

  return (
    <div className="container">
      <h1>Park Stats</h1>
      <div className="stats-container">
        <div className="row-container">
          <div className="column-container">
            <form action="" onSubmit={submitTicketsForGames}>
              <label>Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={dateChangeHandler}
              />
              <button type="submit">Submit</button>
            </form>
            <div className="column-content">
              <h3>Total Tickets for all Games for a certain Date</h3>
              <div className="">
                <p>Tickets Sold For all Games: {tickets}</p>
              </div>
            </div>
          </div>
          <div className="column-container">
            <form action="" onSubmit={onSubmitTicketsByDateAndGame}>
              <label htmlFor="">Date:</label>
              <input type="date" onChange={dateHandler} />
              <label htmlFor="">Game:</label>
              <select
                onChange={gameChangeHandler}
                name="game"
                id=""
                value={selectedGame}
              >
                {games?.map((game) => {
                  return (
                    <option key={game._id} name="name" value={game._id}>
                      {game.name}
                    </option>
                  );
                })}
              </select>
              <button type="submit">Submit</button>
            </form>
            <div className="column-content">
              <h3>Amount of Tickets for certaing Game and Date</h3>
              <p>Total Tickets: {ticketsByGame || 0}</p>
            </div>
          </div>
        </div>
        <div className="row-container">
          <div className="column-container">
            <form action="" onSubmit={profitForSalesByMonthAndYear}>
              <label>Month:</label>
              <input
                type="number"
                max="12"
                min="1"
                pattern="\d*"
                onChange={monthChangeHandler}
              />
              <label>Year:</label>
              <input
                type="number"
                min="2023"
                max="2050"
                pattern="\d*"
                onChange={yearChangeHandler}
              />

              <button type="submit">Submit</button>
            </form>
            <div className="column-content">
              <h3>Total Profit for all Sales for a certain Month and Year</h3>
              <div>
                <p>Total Profit: {total}</p>
              </div>
            </div>
          </div>
          <div className="column-container">
            <form action="" onSubmit={submitCustomerWithMoreTickets}>
              <label>Month:</label>
              <input type="number" onChange={customerMonthChangeHandler} />
              <label>Year:</label>
              <input type="number" onChange={customerYearChangeHandler} />
              <button type="submit">Submit</button>
            </form>
            <div className="column-content">
              <h3>
                Customer that bought the most Tickets for a certain Month and
                Year
              </h3>
              <div>
                <p>
                  Name: {customer?.name} {customer?.lastName}
                </p>
                <p>Tickets: {customer?.ticketCount}</p>
                <p>DNI: {customer?.dni}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row-container">
          <div className="column-container">
            <form action=""></form>
            <div className="column-content">
              <h3>Game with the most Tickets until today´s Date</h3>
              <div>
                <p>Game: {moreTicketsTodayGame?.name} </p>
                <p>Tickets Sold: {moreTicketsTodayGame?.ticketCount || 0} </p>
              </div>
            </div>
          </div>
          <div className="column-container">
            <form action="" onSubmit={onSubmitSaleDate}>
              <label>Date:</label>
              <input type="date" onChange={saleDateHandler} />
              <button type="submit">Submit</button>
            </form>
            <div className="column-content">
              <h3>Total Profit for all Sales for a certain Date</h3>
              <p>Total Profit: {totalInADate || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;
