import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { resetGame } from './slices/game';

import './App.scss';

import PromptManager from './components/PromptManager/PromptManager';

import Header from './components/Header/Header';
import GameInfo from './components/GameInfo/GameInfo';
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard';

const App = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetGame())
  }, [dispatch])

  return (
    <main>
      <div className="center-content">
        <Header />
        <GameInfo />
        <Board />
        <Keyboard />
        <PromptManager />
      </div>      
    </main>
  );
}

export default App;
