import React, { useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../styles/components/Games/Game.css';
import { useSelector, useDispatch  } from 'react-redux';
import { toggleSeeMore } from '../../slices/gameSlice';
import { fetchEmployees } from '../../slices/employeeSlice';
import useDateFormatting from '../../customHooks/useDateFormatting';


function Game({ game }) {

  const { formatDateTimeRange } = useDateFormatting();
  const { name, description, employees, hours, photo, isDivOpen } = game;  
  const employeesList = useSelector(state => state.employees.employees);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch])
  

  const formattedTimes = hours.map(({ opening, closing }) =>
    formatDateTimeRange(opening, closing)
  );

  const toggleMenu = () => {
    const gameId = game._id
    dispatch(toggleSeeMore(gameId))
  }

  const getDataEmployees = (employeeId) => {
    const employee = employeesList.find((employee) => employee._id === employeeId);
    return employee ? employee.name : '';
  };

  return (
    <div className='game_card'>
      <div className="game_heading">
        <div className="image_container">
          <img src={`http://localhost:5000/uploads/${photo}`} alt="no photo" />
        </div>
        <h1>{name}</h1>
      </div>
      <div className="game_content">
        <p className="description">{description}</p>
        <div className="game_hours">
          {formattedTimes.map((time, index) => (
            <div key={index}>{time}</div>
          ))}
        </div>
      </div>
      <button onClick={toggleMenu}>See More<ExpandMoreIcon/></button>
      <div className={`employees ${isDivOpen ? 'show' : 'hide'}`}>
        <p>Employees</p>
        {employees.map((employeeId, index) => (
          <div key={index}>{getDataEmployees(employeeId)}</div>
        ))}
      </div>
    </div>
  );
}

export default Game;
