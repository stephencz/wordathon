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

    prompt: null

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

      let randomWordIndex = Math.floor(Math.random() * state.unusedWords.length);
      state.currentWord = state.unusedWords[randomWordIndex];
      state.unusedWords = state.unusedWords.filter(word => word !== state.unusedWords[randomWordIndex]);
    },
    
    addLetter(state, action) {
      if(state.boardData[state.currentTurn].length < 6) {
        state.boardData[state.currentTurn] = state.boardData[state.currentTurn] + action.payload.letter;
      }
    },

    removeLetter(state) {
      if(state.boardData[state.currentTurn].length > 0) {
        let dataLength = state.boardData[state.currentTurn].length
        state.boardData[state.currentTurn] = state.boardData[state.currentTurn].substring(0, dataLength - 1);
      }
    },

    submitWord(state) {
      if(state.boardData[state.currentTurn].length === 6) {
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

        // If the player guessed the word prompt them with congratulations
        // and ask if they want to continue.
        if(state.boardData[state.currentTurn].toUpperCase() === state.currentWord.toUpperCase()) {
          state.prompt = "round_won"

        } else {

          // If the player is out of guessing turns prompt them with 
          // losing screen.
          if(state.currentTurn > 5) {
            state.prompt = "round_lost";
          }
        }
      }

      

      state.currentTurn = state.currentTurn + 1;
    }
  }
})

export const {
  resetGame,
  addLetter,
  removeLetter,
  submitWord

} = gameSlice.actions;

export default gameSlice.reducer;