import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGames } from '../slices/gameSlice';
import Game from '../components/Games/Game';
import '../styles/components/Games/Games.css'
import Loader from '../components/UI/Loader';

const Games = () => {

  const dispatch = useDispatch();
  const games = useSelector(state => state.games.games)
  const isLoading = useSelector(state => state.games.isLoading)
  const [showContent, setShowContent] = useState(false);

  const timer = setTimeout(() => {
    setShowContent(true);
  }, 50000);

  useEffect(() => {
    dispatch(getGames())
  }, [dispatch])

  if (isLoading || !showContent) {
    return <Loader/>;
  }

  

  return (
    <div className='games-container'>
      <Loader/>
      {games.length > 0 ? (
        games.map((game) => {
          if (game.available === true) {
            return <Game key={game._id} game={game} />;
          }
          return null;
        })
      ) : (
        <div>No games available.</div>
      )}
    </div>
  );
}

export default Games