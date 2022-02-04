import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  resetGame,
  setDifficulty
} from "../../slices/game";

import './GameInfo.scss';

const GameInfo = (props) => {

  const dispatch = useDispatch();

  const streak = useSelector((state) => state.game.streak);

  const handleChangeDifficulty = (event) => {
    if(event.target.options.selectedIndex === 0) {
      dispatch(setDifficulty({ difficulty: 4}))
      dispatch(resetGame());

    } else if(event.target.options.selectedIndex === 1) {
      dispatch(setDifficulty({ difficulty: 5}))
      dispatch(resetGame());

    } else if(event.target.options.selectedIndex === 2) {
      dispatch(setDifficulty({ difficulty: 6}))
      dispatch(resetGame());

    }
  }

  return (
    <div className="game-info">
      <div className="game-difficulty">
        <select id="difficulty-levels" name="difficulty-levels" defaultValue={"5"} onChange={ handleChangeDifficulty }>
          <option value="3">Easy</option>
          <option value="5" >Normal</option>
          <option value="6">Hard</option>
        </select>
      </div>
      <div className="game-streak">
      Streak: { streak }
      </div>
    </div>

  )
}

export default GameInfo;