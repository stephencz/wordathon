import React from "react";

import { useSelector } from "react-redux";

import './Board.scss';

const Board = (props) => {

  const boardData = useSelector((state) => state.game.boardData);
  const currentWord = useSelector((state) => state.game.currentWord);
  const currentTurn = useSelector((state) => state.game.currentTurn);


  const generateGameBoardRow = (row, indice) => {

    let rowTiles = []
    let rowCharacter = row.toUpperCase().split('');
    let currentWordData = currentWord.toUpperCase().split('')

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
  
          } else if(currentWordData.includes(rowCharacter[i])) {
            rowTiles = [...rowTiles, (
              <div key={i} className="row-tile misplaced">
                { rowCharacter[i] }
              </div>
            )]
  
          } else if(!currentWordData.includes(rowCharacter[i])) {
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