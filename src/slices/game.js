import { createSlice } from '@reduxjs/toolkit';

import WinSound from './win.ogg';
import WrongSound from './wrong.ogg';

import FourWords from './word_4.json';
import FiveWords from './words_5.json';
import SixWords from './words_6.json';


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
    unusedWords: FiveWords,

    /**
     * The Game's status is used to do things such as trigger prompts, or
     * advance the rounds.
     */
    status: null,

    /**
     * The Games difficulty settings. Available in Easy (4), Normal (5), and Hard (6).
     */
    difficulty: 5,

    /** True if the sound should play. False if sound should not play. */
    soundEnabled: true

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

      if(state.difficulty === 4) {
        state.unusedWords = FourWords;

      } else if(state.difficulty === 5) {
        state.unusedWords = FiveWords;

      } else if(state.difficulty === 6) {
        state.unusedWords = SixWords;
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
        if(state.difficulty === 4) {
          state.unusedWords = FourWords;
  
        } else if(state.difficulty === 5) {
          state.unusedWords = FiveWords;
  
        } else if(state.difficulty === 6) {
          state.unusedWords = SixWords;
        }
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
      if(state.boardData[state.currentTurn].length < state.difficulty) {
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
      if(state.boardData[state.currentTurn].length >= state.difficulty) {
        let boardWordData = state.boardData[state.currentTurn].toUpperCase().split('');
        let currentWordData = state.currentWord.toUpperCase().split('');

        for(let i = 0; i < state.difficulty; i++) {
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

          if(state.soundEnabled) {
            let audio = new Audio(WrongSound);
            audio.volume = 0.5;
            audio.play();
          }
          

        } else {

          if(state.soundEnabled) {
            let audio = new Audio(WinSound);
            audio.play();
          }
          
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
    },


    setDifficulty(state, action) {
      state.difficulty = action.payload.difficulty;
    },

    setSoundEnabled(state, action) {
      state.soundEnabled = action.payload.soundEnabled;
    }
  }
})

export const {
  resetGame,
  advanceRound,
  addLetter,
  removeLetter,
  submitWord,
  setStatus,
  setDifficulty,
  setSoundEnabled

} = gameSlice.actions;

export default gameSlice.reducer;