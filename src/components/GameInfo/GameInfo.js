import React from "react";
import { useSelector } from "react-redux";
import './GameInfo.scss';

const GameInfo = (props) => {

  const streak = useSelector((state) => state.game.streak);

  return (
    <div className="game-info">
      Streak: { streak }
    </div>
  )
}

export default GameInfo;