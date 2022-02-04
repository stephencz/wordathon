import React from "react";

import { useDispatch } from "react-redux";
import {
  resetGame,
  setDifficulty
} from "../../slices/game";

import './Header.scss';

const Header = (props) => {

  const dispatch = useDispatch();

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
    <header>
      <div className="game-name">WORDATHON</div>
      <div className="game-difficulty">
        <select id="difficulty-levels" name="difficulty-levels" defaultValue={"5"} onChange={ handleChangeDifficulty }>
          <option value="3">Easy</option>
          <option value="5" >Normal</option>
          <option value="6">Hard</option>
        </select>
      </div>
    </header>
  )
}

export default Header