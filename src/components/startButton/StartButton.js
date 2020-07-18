import React from 'react';
import './StartButton.css';

function StartButton(props) {
  const buttonText = 'Start';
  const onClickStart = () => {
    props.onClick(true);
  };

  return (
    <div>
      <button className='game-start-button' onClick={onClickStart}>
        {buttonText}
      </button>
    </div>
  );
}

export default StartButton;
