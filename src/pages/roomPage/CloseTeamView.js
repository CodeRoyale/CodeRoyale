import React from 'react';

function CloseTeamView({ setState }) {
  return (
    <div>
      <img
        src='/images/close_button_white.svg'
        alt=''
        className='close-team-close-button'
        onClick={() => setState({ action: 'LEAVE_TEAM' })}
      />
    </div>
  );
}

export default CloseTeamView;
