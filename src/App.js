import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { resetGame } from './slices/game';

import './App.scss';

import Header from './components/Header/Header';
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard';

const App = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetGame())
  }, [dispatch])

  return (
    <main>
      <Header />
      <Board />
      <Keyboard />
    </main>
  );
}

export default App;
