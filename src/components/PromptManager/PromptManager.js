import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { 
  resetGame
} from '../../slices/game';

import Close from "./close.png";
import "./PromptManager.scss";

const PromptManager = (props) => {

  const dispatch = useDispatch();

  const status = useSelector((state) => state.game.status);
  const streak = useSelector((state) => state.game.streak);
  const currentWord = useSelector((state) => state.game.currentWord);
  const difficulty = useSelector((state) => state.game.difficulty);

  const renderLosePrompt = () => {
    return (
      <div className="prompt-wrapper">
        <div className="prompt">
          <div className="lost-message">
            You lost. Nice try.
          </div>
          <div className="lost-message">
            The word was: <span className="lost-current-word">{ currentWord.toUpperCase() }</span>
          </div>
          <div className="lost-streak">
            Streak: <span className="lost-streak-text">{ streak } words</span>
          </div>
          <div className="lost-buttons">
            <div className="play-again-button" onClick={ handleLosePlayAgainButton }>Play Again</div>
            <div className="share-button" onClick={ handleLoseShareButton }>Share</div>
          </div>
        </div>
      </div>
    )
  }

  const handleLoseShareButton = () => {
    const getDifficulty = (difficulty) => {
      if(difficulty === 4) {
        return "Easy"
      } else if(difficulty === 5) {
        return "Normal"
      } else if(difficulty === 6) {
        return "Hard"
      }

      return "";
    }
    navigator.clipboard.writeText(
      + "Difficulty: " + getDifficulty(difficulty) + "\n"
      + "Streak: " + streak + " words\n" 
      + "I lost to the word: " + currentWord.toUpperCase() + "\n"
      + 'Play at: wordathon.stephencz.com')
  }

  const handleLosePlayAgainButton = () => {
    dispatch(resetGame());
  }

  const renderPrompt = () => {
    if(status !== null) {
      if(status === "round_lost") {
        return renderLosePrompt();
      }
    } else {
      return;
    }
  };

  return (
    <div className="prompt-manager">
      { renderPrompt() }
    </div>
  )
}

export default PromptManager;