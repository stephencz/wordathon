import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  advanceRound
} from "../../slices/game";

import './Board.scss';

const Board = (props) => {

  const dispatch = useDispatch();

  const boardData = useSelector((state) => state.game.boardData);
  const currentWord = useSelector((state) => state.game.currentWord);
  const currentTurn = useSelector((state) => state.game.currentTurn);
  const status = useSelector((state) => state.game.status);

  useEffect(() => {
    if(status === "round_won") {
      const timer = setTimeout(() => {
        dispatch(advanceRound())
      }, 2000);
      return () => clearTimeout(timer);
    }
    
  }, [boardData, status, dispatch])

  const generateGameBoardRow = (row, indice) => {

    let rowTiles = []
    let rowCharacter = row.toUpperCase().split('');
    let currentWordData = currentWord.toUpperCase().split('')
    let remainingLetters = currentWord.toUpperCase().split('')

    // Process exact matches from remaining letters to avoid showing
    // a misplaced letter for letters that have an exact
    for(let i = 0; i < 6; i++) {
      if(rowCharacter[i] === currentWordData[i]) {
        remainingLetters.splice(remainingLetters.indexOf(rowCharacter[i]), 1);
      }
    }

    for(let i = 0; i < 6; i++) {

      // If the row is missing data i.e. if there are less than
      // six characters, we render an empty tile.
      if(row.length <= i) {
        rowTiles = [...rowTiles, (
          <div key={i} className="row-tile empty"></div>
        )]

      } else {

        // If the row indice represents a previous turn at guessing, then
        // it is safe to render the exact, misplaced, and unused tiles which
        // help the user. Otherwise, the row is on the current turn and we have
        // to render it as an initial tile.
        if(indice < currentTurn) {
          if(rowCharacter[i] === currentWordData[i]) {
            rowTiles = [...rowTiles, (
              <div key={i} className="row-tile exact">
                { rowCharacter[i] }
              </div>
            )]

          } else if(remainingLetters.includes(rowCharacter[i])) {

            rowTiles = [...rowTiles, (
              <div key={i} className="row-tile misplaced">
                { rowCharacter[i] }
              </div>
            )]  

            remainingLetters.splice(remainingLetters.indexOf(rowCharacter[i]), 1)
            
            
          } else if(!currentWordData.includes(rowCharacter[i])) {
            rowTiles = [...rowTiles, (
              <div key={i} className="row-tile unused">
                { rowCharacter[i] }
              </div>
            )]
          } else {
            rowTiles = [...rowTiles, (
              <div key={i} className="row-tile unused">
                { rowCharacter[i] }
              </div>
            )]
          }
        } else {
          rowTiles = [...rowTiles, (
            <div key={i} className="row-tile initial">
              { rowCharacter[i] }
            </div>
          )]
        }
        
      }
    }

    return rowTiles;
  }

  const generateGameBoard = (boardData) => {
    return (
      <div className="board">
        <div className="board-row">
          { generateGameBoardRow(boardData[0], 0) }
        </div>

        <div className="board-row">
          { generateGameBoardRow(boardData[1], 1) }
        </div>

        <div className="board-row">
          { generateGameBoardRow(boardData[2], 2) }
        </div>

        <div className="board-row">
          { generateGameBoardRow(boardData[3], 3) }
        </div>

        <div className="board-row">
          { generateGameBoardRow(boardData[4], 4) }
        </div>

        <div className="board-row">
          { generateGameBoardRow(boardData[5], 5) }
        </div>
      </div>
    );
  }

  return (
    <div className="board-wrapper">
      { generateGameBoard(boardData) }
    </div>
  )
}

export default Board;