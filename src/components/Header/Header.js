import React from "react";

import SettingsIcon from './setting.png';
import QuestionIcon from './question.png';

import './Header.scss';

const Header = (props) => {
  return (
    <header>
      <div className="game-instructions">
        <img src={QuestionIcon} alt="A button for game instructions." />
      </div>
      <div className="game-name">WORDATHON</div>
      <div className="game-settings">
        <img src={ SettingsIcon } alt="A button for game settings." />
      </div>
    </header>
  )
}

export default Header