import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  advanceRound
} from "../../slices/game";

import './Board.scss';

/**
 * The Board component represents a word game board i.e. six
 * rows for six words of equal length. The Board component uses
 * the value of the current word, the current turn number, and
 * the user's guess to dynamically color the tiles in each row to
 * provide the user with hints about their guess.
 */
const Board = (props) => {

  const dispatch = useDispatch();

  // Game Slice Status
  const boardData = useSelector((state) => state.game.boardData);
  const currentWord = useSelector((state) => state.game.currentWord);
  const currentTurn = useSelector((state) => state.game.currentTurn);
  const status = useSelector((state) => state.game.status);
  const difficulty = useSelector((state) => state.game.difficulty);

  const [resize, setResize] = useState(false);

  // Board Resizing for Responsive Design
  const boardRef = useRef(null);

  useEffect(() => {
    if(status === "round_won") {
      
      const timer = setTimeout(() => {
        dispatch(advanceRound())
      }, 2000);
      return () => clearTimeout(timer);
    } 

    if(resize === true) {
      setResize(false);
    } 
    
  }, [boardData, resize, status, setResize, dispatch])

  useLayoutEffect(() => {

      const handleResize = () => {
        setResize(true);
      }
  
      window.addEventListener("resize", handleResize);
      document.addEventListener("load", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize)
        document.removeEventListener("load", handleResize);
      }
    
  }, [setResize])

  const getTileStyles = () => {

    if(boardRef.current !== null && boardRef.current !== undefined) {

      let boardWidth = boardRef.current.offsetWidth - 90;
      let boardHeight = boardRef.current.offsetHeight - 100;

      let tileSize = boardWidth / 6
      if(boardWidth > boardHeight) {
        tileSize = (boardHeight / 6)
      }

      return {
        minWidth: tileSize,
        minHeight: tileSize,
        fontSize: tileSize / 2
      }
      
    }

    return { };
  }

  const generateGameBoardRow = (row, indice) => {

    let rowTiles = []
    let rowCharacter = row.toUpperCase().split('');
    let currentWordData = currentWord.toUpperCase().split('')
    let remainingLetters = currentWord.toUpperCase().split('')

    // Process exact matches from remaining letters to avoid showing
    // a misplaced letter for letters that have an exact
    for(let i = 0; i < difficulty; i++) {
      if(rowCharacter[i] === currentWordData[i]) {
        remainingLetters.splice(remainingLetters.indexOf(rowCharacter[i]), 1);
      }
    }

    for(let i = 0; i < difficulty; i++) {

      // If the row is missing data i.e. if there are less than
      // six characters, we render an empty tile.
      if(row.length <= i) {
        rowTiles = [...rowTiles, (
          <div key={i} className="row-tile empty" style={ getTileStyles() }></div>
        )]

      } else {

        // If the row indice represents a previous turn at guessing, then
        // it is safe to render the exact, misplaced, and unused tiles which
        // help the user. Otherwise, the row is on the current turn and we have
        // to render it as an initial tile.
        if(indice < currentTurn) {
          if(rowCharacter[i] === currentWordData[i]) {
            rowTiles = [...rowTiles, (
              <div key={i} className="row-tile exact" style={ getTileStyles() }>
                { rowCharacter[i] }
              </div>
            )]

          } else if(remainingLetters.includes(rowCharacter[i])) {

            rowTiles = [...rowTiles, (
              <div key={i} className="row-tile misplaced" style={ getTileStyles() }>
                { rowCharacter[i] }
              </div>
            )]  

            remainingLetters.splice(remainingLetters.indexOf(rowCharacter[i]), 1)
            
            
          } else if(!currentWordData.includes(rowCharacter[i])) {
            rowTiles = [...rowTiles, (
              <div key={i} className="row-tile unused" style={ getTileStyles() }>
                { rowCharacter[i] }
              </div>
            )]
          } else {
            rowTiles = [...rowTiles, (
              <div key={i} className="row-tile unused" style={ getTileStyles() }>
                { rowCharacter[i] }
              </div>
            )]
          }
        } else {
          rowTiles = [...rowTiles, (
            <div key={i} className="row-tile initial" style={ getTileStyles() }>
              { rowCharacter[i] }
            </div>
          )]
        }
        
      }
    }

    return rowTiles;
  }

  const generateGameBoard = (boardData) => {

    let rows = []
    for(let i = 0; i < 6; i++) {
      if(boardData[i] !== undefined && boardData[i] !== null) {
        rows = [...rows, (
          <div key={ i } className="board-row">
            { generateGameBoardRow(boardData[i], i) }
          </div>
        )]
      }
    }

    return (
      <div className="board">
        { rows }
      </div>
    );
  }

  return (
    <div className="board-wrapper" ref={ boardRef }>
      { generateGameBoard(boardData) }
    </div>
  )
}

export default Board;