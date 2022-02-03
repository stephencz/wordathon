import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
  addLetter,
  removeLetter,
  submitWord
} from "../../slices/game";


import './Keyboard.scss';

const Keyboard = (props) => {

  const dispatch = useDispatch();

  const keyRowOneValues   = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keyRowTwoValues   = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keyRowThreeValues = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'];

  const exactLetters = useSelector((state) => state.game.exactLetters);
  const misplacedLetters = useSelector((state) => state.game.misplacedLetters);
  const unusedLetters = useSelector((state) => state.game.unusedLetters);

  const handleKeyPresses = (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      dispatch(addLetter({ letter: event.key }))
    
    } else if (event.keyCode === 8 || event.keyCode === 46) {
      dispatch(removeLetter());

    } else if (event.keyCode === 13) {
      dispatch(submitWord());
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPresses);

    return () => {
      document.removeEventListener("keydown", handleKeyPresses);
    }
  });

  const handleEnterKey = (event) => {
    dispatch(submitWord())
  }

  const handleDeleteKey = (event) => {
    dispatch(removeLetter())
  }

  const handleNormalKey = (key) => {
    dispatch(addLetter({ letter: key}))
  }

  const generateRowKeys = (keyRowValues) => {
    return keyRowValues.map((key, index) => {

      let divClasses = ["key"]

      if(exactLetters.includes(key)) {
        divClasses = [...divClasses, "exact"]

      } else if(misplacedLetters.includes(key)) {
        divClasses = [...divClasses, "misplaced"]

      } else if(unusedLetters.includes(key)) {
        divClasses = [...divClasses, "unused"]

      }

      if(key === "ENTER") {
        return (
          <div 
            key={index} 
            className="key" 
            onClick={ (event) => handleEnterKey(event)  }
          >
            { key }
          </div>
        );
      } 

      if(key === "DELETE") {
        return (
          <div 
            key={index} 
            className="key" 
            onClick={ (event) => handleDeleteKey(event)  }
          >
            { key }
          </div>
        );
      }

      return (
        <div 
          key={ index } 
          className={ divClasses.join(' ') }
          onClick={ () => handleNormalKey(key)}
        >
        { key } 
        </div>
      )
    })
  };

  return (
    <div className="keyboard">
      <div className="key-row">
        { generateRowKeys(keyRowOneValues) }
      </div>
      <div className="key-row">
        { generateRowKeys(keyRowTwoValues) }
      </div>
      <div className="key-row">
        { generateRowKeys(keyRowThreeValues) }
      </div>
    </div>
  )
}

export default Keyboard;