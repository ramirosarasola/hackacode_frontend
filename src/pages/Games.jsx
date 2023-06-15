import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGames } from '../slices/gameSlice';
import Game from '../components/Games/Game';
import '../styles/components/Games/Games.css'

const Games = () => {

  const dispatch = useDispatch();
  const games = useSelector(state => state.games.games)
  const isLoading = useSelector(state => state.games.isLoading)

  useEffect(() => {
    dispatch(getGames())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(games);

  return (  
    <div className='games-container'> 
      {games.length > 0 ? (
        games.map(game => (
          <Game key={game._id} game={game} />
        ))
      ) : (
        <div>No games available.</div>
      )}
    </div>
  )
}

export default Games