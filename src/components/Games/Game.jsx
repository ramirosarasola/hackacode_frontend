import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../styles/components/Games/Game.css';
import { useSelector, useDispatch  } from 'react-redux';
import { toggleSeeMore } from '../../slices/gameSlice';
import { fetchEmployees } from '../../slices/employeeSlice';
import useDateFormatting from '../../customHooks/useDateFormatting';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteGame } from '../../slices/gameSlice';
import { ConfirmAlert } from '../../components/UI/alert';


function Game({ game }) {

  const { formatDateTimeRange } = useDateFormatting();
  const { name, description, employees, hours, photo, available } = game;  
  const employeesList = useSelector(state => state.employees.employees);
  const [isDivOpen, setIsDivOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch])
  

  const formattedTimes = hours.map(({ opening, closing }) =>
    formatDateTimeRange(opening, closing)
  );

  const toggleMenu = () => {
    // const gameId = game._id
    // dispatch(toggleSeeMore(gameId))
    setIsDivOpen(!isDivOpen)
  }

  const getDataEmployees = (employeeId) => {
    const employee = employeesList.find((employee) => employee._id === employeeId);
    return employee ? (
      <div>
        {employee.name} <span>{employee.lastName}</span>
      </div>
    ) : (
      ''
    );
  };
  

  const onDeleteHandler = () => {
    const gameId = game._id;
    const hasEmployeesAssigned = game?.employees?.length;

    ConfirmAlert('Are you sure?', `${hasEmployeesAssigned >0 ? 'This game has one or more employees working on it!': 'You will not be able to revert this.'}`, 'Yes, delete it', 'No, cancell').then((result) => {

      if (hasEmployeesAssigned && result) {
        dispatch(deleteGame(gameId));
        console.info("game deleted....");
      } else {
        console.log("deletion canceled...");
      }
    });
  }


  return (
    <div className={`game_card ${!game.available && 'disabled'}`}>
      <div className="game_heading">
        <div className="image_container">
          <button className='delete_button' onClick={onDeleteHandler}><DeleteForeverIcon/></button>
          <img src={`http://localhost:5000/uploads/${photo}`} alt="no photo" />
        </div>
        <div className="title">
          <h1>{name}</h1>
        </div>
      </div>
      <div className="game_content">
        <p className="description">{description}</p>
        <div className="game_hours">
          {formattedTimes.map((time, index) => (
            <div key={index}>{time}</div>
          ))}
        </div>
      <button onClick={toggleMenu}>See More<ExpandMoreIcon/></button>
      <div className={`employees ${isDivOpen ? 'show' : 'hide'}`}>
        <p>Employees</p>
        {employees.map((employeeId, index) => (
          <div className='employee' key={index}>{getDataEmployees(employeeId)}</div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Game;
