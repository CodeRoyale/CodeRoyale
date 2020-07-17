import React from 'react';

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
