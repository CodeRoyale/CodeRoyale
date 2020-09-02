import React, { useState } from 'react';
import Button from '../../components/button/Button';
import { Redirect } from 'react-router';

function StartCompetitionButton({ socket }) {
  const [startCompClicked, setStartCompClicked] = useState(false);
  const onClickStartCompetition = () => {
    setStartCompClicked(true);
  };

  if (startCompClicked) {
    return <Redirect to={{ pathname: '/veto', props: { socket: socket } }} />;
  }

  return (
    <div className='start-competition-view'>
      <div className='start-competition-view-text'>
        <b>Start Competition</b>
      </div>
      <div className='start-competition-view-button'>
        <Button
          type='button'
          onClick={onClickStartCompetition}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default StartCompetitionButton;
