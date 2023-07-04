import React from "react";
import GameForm from "./GameForm";
import { useParams } from "react-router-dom";

const GameEditor = () => {
  const { id } = useParams();
  return <GameForm id={id} />;
};

export default GameEditor;
