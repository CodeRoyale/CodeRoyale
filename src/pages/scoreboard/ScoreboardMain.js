import React, { useState } from 'react';
import './ScoreboardMain.css';
import { Icon, Whisper, Tooltip } from 'rsuite';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

const ScoreboardMain = ({ roomData }) => {
  const [backClicked, setBackClicked] = useState(false);
  const greenRGB = '60, 255, 0';
  const alpha = ',0.7';

  if (backClicked) {
    return <Redirect to='/dashboard' />;
  }

  let winTeam = '';
  //   let scorecard = roomData.data.competition.scoreboard;
  //   let max_score = 0;
  //   for (let teamName in scorecard) {
  //     let score = scorecard[teamName].length;
  //     console.log('score', score);
  //     if (score > max_score) {
  //       winTeam = teamName;
  //       max_score = score;
  //     }
  //   }
  return (
    <div className='win-lose'>
      <div className='win-lose-back'>
        <Whisper
          placement='right'
          trigger='hover'
          speaker={<Tooltip>Go to Dashboard</Tooltip>}
        >
          <Icon
            onClick={() => setBackClicked(true)}
            icon='back-arrow'
            size='2x'
            style={{ margin: '20px' }}
          />
        </Whisper>
      </div>

      <div className='win-lose-result-container'>
        <div
          style={{
            background: 'rgba(' + greenRGB + alpha + ')',
            border: 'solid rgb(' + greenRGB + ') 5px',
          }}
          className='win-lose-result'
        >
          <b>Team {winTeam}</b>
          <br />
          <b>WON</b>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    roomData: state.roomData,
  };
};
export default connect(mapStateToProps, null)(ScoreboardMain);
