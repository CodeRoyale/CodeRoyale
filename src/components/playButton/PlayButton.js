import React from 'react';
import './PlayButton.css';
import { Link } from 'react-router-dom';

function PlayButton(props) {
  const buttonText = 'Play';
  const onClickStart = () => {
    //TODO: Code to do after button click...
  };
  return (
    <div>
      <Link to='/lobby'>
        <button className='game-start-button' onClick={onClickStart}>
          {buttonText}
        </button>
      </Link>
    </div>
  );
}

export default PlayButton;
