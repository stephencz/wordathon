import { createSlice } from '@reduxjs/toolkit';
import words from './words.json'

const gameSlice = createSlice({
  name: 'game',
  initialState: {

    /**
     * An Array of six objects containing the data
     * being displayed on the game board.
     */
    boardData: ["", "", "", "", "", ""],

    /**
     * The player's word solving streak.
     */
    streak: 0,

    /**
      * The turn number for the current word.
      */
    currentTurn: 0,

    /**
      * The current word the user is trying to guess.
      */
    currentWord: "",

    /**
     * Letters the user guessed that go exactly where the user 
     * put them, i.e. green letters from wordle.
     */
    exactLetters: [],

    /**
      * Letters the user guessed that go in the word, but not
      * where the user put them, i.e. yellow letters from wordle.
      */
    misplacedLetters: [],

    /**
      * Letters that the user guess that don't go in the word, i.e.
      * grey letters from wordle.
      */
     unusedLetters: [],

    /**
     * An Array of objects representing the history of the users run.
     */
    history: [],

    /**
     * An Array of words that the user hasn't seen yet.
     */
    unusedWords: words,

    status: null

  }, 
  reducers: {

    /**
     * Resets the game's state to its default/starting state.
     * @param {*} state 
     */
    resetGame(state) {
      
      state.boardData = ["", "", "", "", "", ""];

      state.streak = 0;
      state.currentTurn = 0;

      state.exactLetters = [];
      state.misplacedLetters = [];
      state.unusedLetters = [];

      state.history = [];

      state.status = null;

      if(state.unusedWords.length >= 0) {
        state.unusedWords = words;
      }

      let randomWordIndex = Math.floor(Math.random() * state.unusedWords.length);
      state.currentWord = state.unusedWords[randomWordIndex];
      state.unusedWords = state.unusedWords.filter(word => word !== state.unusedWords[randomWordIndex]);
    },
    
    /**
     * Advances the game to the next round.
     * @param {*} state 
     */
    advanceRound(state) {
      state.boardData = ["", "", "", "", "", ""];

      state.streak = state.streak + 1;
      state.currentTurn = 0;

      state.exactLetters = [];
      state.misplacedLetters = [];
      state.unusedLetters = [];

      state.history = [];
      state.status = null

      if(state.unusedWords.length >= 0) {
        state.unusedWords = words;
      }

      let randomWordIndex = Math.floor(Math.random() * state.unusedWords.length);
      state.currentWord = state.unusedWords[randomWordIndex];
      state.unusedWords = state.unusedWords.filter(word => word !== state.unusedWords[randomWordIndex]);
    },

    /**
     * Adds a letter to the board.
     * @param {*} state 
     * @param {*} action 
     */
    addLetter(state, action) {
      if(state.boardData[state.currentTurn].length < 6) {
        state.boardData[state.currentTurn] = state.boardData[state.currentTurn] + action.payload.letter;
      }
    },

    /**
     * Removes a letter from the board.
     * @param {*} state 
     */
    removeLetter(state) {
      if(state.boardData[state.currentTurn].length > 0) {
        let dataLength = state.boardData[state.currentTurn].length
        state.boardData[state.currentTurn] = state.boardData[state.currentTurn].substring(0, dataLength - 1);
      }
    },

    /**
     * Processes the user's word submission.
     * @param {*} state 
     */
    submitWord(state) {

      // First we check to make sure that the word as a length of six or more
      // because smaller lengths are invalid.
      if(state.boardData[state.currentTurn].length >= 6) {
        let boardWordData = state.boardData[state.currentTurn].toUpperCase().split('');
        let currentWordData = state.currentWord.toUpperCase().split('');

        for(let i = 0; i < 6; i++) {
          if(boardWordData[i] === currentWordData[i] && !state.exactLetters.includes(boardWordData[i])) {
            state.exactLetters = [...state.exactLetters, boardWordData[i]];

          } else if(currentWordData.includes(boardWordData[i]) && !state.misplacedLetters.includes(boardWordData[i])) {
            state.misplacedLetters = [...state.misplacedLetters, boardWordData[i]]

          } else {
            if(!state.unusedLetters.includes(boardWordData[i])) {
              state.unusedLetters = [...state.unusedLetters, boardWordData[i]]
            }
          }
        }

        if(state.boardData[state.currentTurn].toUpperCase() !== state.currentWord.toUpperCase()) {
          if(state.currentTurn >= 5) {
            state.status = "round_lost";
          } else {
            state.currentTurn = state.currentTurn + 1;

          }
        } else {
          state.status = "round_won"
          state.currentTurn = state.currentTurn + 1;
        }
      }      
    },

    /**
     * Changes the game's status.
     * @param {*} state 
     * @param {*} action 
     */
    setStatus(state, action) {
      state.status = action.payload.status;
    }
  }
})

export const {
  resetGame,
  advanceRound,
  addLetter,
  removeLetter,
  submitWord,
  setStatus

} = gameSlice.actions;

export default gameSlice.reducer;