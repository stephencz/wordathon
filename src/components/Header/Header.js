import React from "react";

import { useSelector } from "react-redux";

import './Header.scss';

const Header = (props) => {

  const streak = useSelector((state) => state.game.streak);

  return (
    <header>
      <div className="game-name">WORDATHON</div>
    </header>
  )
}

export default Header