import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  resetGame,
  setDifficulty,
  setSoundEnabled
} from "../../slices/game";

import MuteImage from './mute.png';
import UnmuteImage from './unmute.png';

import './GameInfo.scss';

const GameInfo = (props) => {

  const dispatch = useDispatch();

  const streak = useSelector((state) => state.game.streak);
  const soundEnabled = useSelector((state) => state.game.soundEnabled);

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

  const getSoundToggleImage = () => {
    if(soundEnabled) {
      return (
        <img
          src={MuteImage}
          alt="mute sound"
          onClick={ () => dispatch(setSoundEnabled({ soundEnabled: false })) }
        />
      );
    } else {
      return (
        <img
        src={UnmuteImage}
        alt="mute sound"
        onClick={ () => dispatch(setSoundEnabled({ soundEnabled: true })) }
      />
      )
    }
  }

  return (
    <div className="game-info">
      <div className="game-streak">
        Streak: { streak }
      </div>
      <div className="game-difficulty">
        <span style={{marginRight: 15}}>Difficulty:</span>
        <select id="difficulty-levels" name="difficulty-levels" defaultValue={"5"} onChange={ handleChangeDifficulty }>
          <option value="3">Easy</option>
          <option value="5" >Normal</option>
          <option value="6">Hard</option>
        </select>
      </div>
      <div className="game-sound-toggle">
        { getSoundToggleImage() }
      </div>
    </div>
  )
}

export default GameInfo;