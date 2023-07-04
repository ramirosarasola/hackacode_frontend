import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGames } from "../slices/gameSlice";
import Game from "../components/Games/Game";
import "../styles/components/Games/Games.css";
import Loader from "../components/UI/Loader";

const Games = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.games);
  const isLoading = useSelector((state) => state.games.isLoading);
  const [showContent, setShowContent] = useState(false);
  const [showDisabled, setShowDisabled] = useState(false);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  const handleDisabled = () => {
    setShowDisabled(!showDisabled);
  };

  return (
    <section className="games">
      <div className="toggle-button">
        <input type="checkbox" id="toggle" onClick={handleDisabled} />
      </div>
      <h2 className="games-title">All Games</h2>
      <div className="games-container">
        {games.length > 0 ? (
          games.map((game) => {
            if (showDisabled) {
              return <Game key={game._id} game={game} />;
            } else {
              if (game.available) {
                return <Game key={game._id} game={game} />;
              }
            }
          })
        ) : (
          <div>No games available.</div>
        )}
      </div>
    </section>
  );
};

export default Games;
