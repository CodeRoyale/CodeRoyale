import React from 'react';

function CloseTeamView({ socket }) {
  const onClickCloseTeam = () => {
    //TODO: Delete team...
  };
  return (
    <div>
      <img
        src='/images/close_button_white.svg'
        alt=''
        className='close-team-close-button'
        onClick={onClickCloseTeam}
      />
    </div>
  );
}

export default CloseTeamView;
