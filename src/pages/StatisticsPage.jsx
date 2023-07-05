import { useState, useEffect } from 'react'
import '../styles/pages/StatisticsPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { 
    ticketsForGamesByDate, 
    gameWithMoreTicketsToday, 
} from '../slices/gameSlice'
import { totalProfitInAMonth } from '../slices/saleSlice';
import { customerWithMoreTickets } from '../slices/customerSlice';


function StatisticsPage() {
    const [ selectedDate, setSelectedDate ] = useState('');
    const [ selectedMonth, setSelectedMonth ] = useState('');
    const [ selectedYear, setSelectedYear ] = useState('');
    const [ customerSelectedYear, setCustomerSelectedYear] = useState('');
    const [ customerSelectedMonth, setCustomerSelectedMonth] = useState('');
    const tickets = useSelector(state => state.games.tickets) 
    const moreTicketsTodayGame = useSelector((state) => state.games.moreTicketsTodayGame)
    const customer = useSelector(state => state.customers.customer);
    const total = useSelector(state => state.sales.total);
    
    useEffect(() => {
        dispatch(gameWithMoreTicketsToday());
    }, [])

    const dispatch = useDispatch();

    const dateChangeHandler = (e) => {
        setSelectedDate(e.target.value);
      };

    const submitTicketsForGames = (e) => {
        e.preventDefault();
        const date = new Date(selectedDate);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getUTCDate();
        dispatch(ticketsForGamesByDate({ year, month, day }))
    }

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
    }

    const submitCustomerWithMoreTickets = (e) => {
        e.preventDefault();
        dispatch(customerWithMoreTickets({ month: customerSelectedMonth, year: customerSelectedYear }));
    }

    

  return (
    <div className='container'>
        <h1>Park Stats</h1>
        <div className='stats-container'>
            <div className="row-container">
                <div className="column-container">
                    <form action="" onSubmit={submitTicketsForGames}>
                        <label>Date:</label>
                        <input type="date" value={selectedDate} onChange={dateChangeHandler}/>
                        <button type='submit'>Submit</button>
                    </form>
                    <div className="column-content">
                        <h3>Total Tickets for all Games for a certain Date</h3>
                        <div className="">
                            <p>Tickets Sold For all Games: {tickets}</p>
                        </div>
                    </div>
                </div>
                <div className="column-container">
                    <form action="">
                        <label htmlFor="">Date:</label>
                        <input type="date" />
                        <label htmlFor="">Game:</label>
                        <select name="" id="">
                            <option value="">Game 1</option>
                            <option value="">Game 2</option>
                            <option value="">Game 3</option>
                        </select>
                        <button type='submit'>Submit</button>
                    </form>
                    <div className="column-content">
                        <h3>Amount of Tickets for certaing Game and Date</h3>
                    </div>
                </div>
            </div>
            <div className="row-container">
                <div className="column-container">
                    <form action="" onSubmit={profitForSalesByMonthAndYear}>
                        <label>Month:</label>
                        <input type="number" max="12" min="1" pattern="\d*" onChange={monthChangeHandler}/>
                        <label>Year:</label>
                        <input type="number" min="2023" max="2050" pattern="\d*" onChange={yearChangeHandler} />
                        
                        <button type='submit'>Submit</button>
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
                        <input type="number" onChange={customerMonthChangeHandler}/>
                        <label>Year:</label>
                        <input type="number" onChange={customerYearChangeHandler} />
                        <button type='submit'>Submit</button>
                    </form>
                    <div className="column-content">
                        <h3>Customer that bought the most Tickets for a certain Month and Year</h3>
                        <div>
                            <p>Name: {customer?.name}</p>
                            <p>Tickets: {customer?.ticketCount}</p>
                        </div>
                    </div>
                </div>                
            </div>
            <div className="row-container">
                <div className="column-container">
                    <form action="">
                    </form>
                    <div className="column-content">
                        <h3>Game with the most Tickets until today´s Date</h3>
                        <div>
                            <p>Game: {moreTicketsTodayGame?.name} </p>
                            <p>Tickets Sold: {moreTicketsTodayGame?.ticketCount} </p>
                        </div>
                    </div>
                </div>
                <div className="column-container">
                    <form action="">
                        <label>Date:</label>
                        <input type="date" />
                        <button type='submit'>Submit</button>
                    </form>
                    <div className="column-content">
                        <h3>Total Tickets for all Games for a certain Date</h3>
                        
                    </div>
                </div>                
            </div>
            
        </div>
    </div>
  )
}

export default StatisticsPage