import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../styles/components/Games/Game.css';
import { useSelector, useDispatch  } from 'react-redux';
import { toggleSeeMore } from '../../slices/gameSlice';


function Game({ game }) {
  const { name, description, employees, hours, photo, isDivOpen } = game;  

  const dispatch = useDispatch()

  const formatDateTimeRange = (opening, closing) => {
    const openingTime = new Date(opening);
    const closingTime = new Date(closing);
    
    if (openingTime.getDate() === closingTime.getDate()) {
      const day = openingTime.getDate();
      const month = openingTime.getMonth() + 1;
      const year = openingTime.getFullYear();
      const openingHours = String(openingTime.getHours()).padStart(2, '0');
      const openingMinutes = String(openingTime.getMinutes()).padStart(2, '0');
      const closingHours = String(closingTime.getHours()).padStart(2, '0');
      const closingMinutes = String(closingTime.getMinutes()).padStart(2, '0');

      return `${day}/${month}/${year} from (${openingHours}:${openingMinutes}) to (${closingHours}:${closingMinutes})`;
    } else {
      // Handle the case when opening and closing hours are on different dates
      const formattedOpening = formatDateTime(opening);
      const formattedClosing = formatDateTime(closing);
      return `${formattedOpening} to ${formattedClosing}`;
    }
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const formattedTimes = hours.map(({ opening, closing }) =>
    formatDateTimeRange(opening, closing)
  );

  const toggleMenu = () => {
    const gameId = game._id
    dispatch(toggleSeeMore(gameId))
  }

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
        {employees.map((employee, index) => (
          <div key={index}>{employee}</div>
        ))}
      </div>
    </div>
  );
}

export default Game;
