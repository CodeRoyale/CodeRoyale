import React from 'react';
import './PlayFriendButton.css';

function StartButton(props) {
  const buttonText = 'Play';
  const onClickStart = () => {
    props.onClick(true);
  };

  return (
    <div>
      <button className='game-friend-start-button' onClick={onClickStart}>
        {buttonText}
      </button>
    </div>
  );
}

export default StartButton;
