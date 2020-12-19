import React from 'react';
import './ScoreboardMain.css';
import { Icon, Whisper, Tooltip } from 'rsuite';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import ScoreboardTeam from './ScoreboardTeam';

const ScoreboardMain = ({ roomData, socketData, arenaData }) => {
  const history = useHistory();
  const socket = socketData.socket;

  if (socket === null) {
    history.push('/dashboard');
  }

  // After 20 secs move user to /dashboard
  setTimeout(() => {
    history.push('/dashboard');
  }, 20000);

  // Getting the scorecard and teams from lobby
  let scoreCard;
  let roomTeams;
  if (roomData.data != null && arenaData.scoreboardData != null) {
    scoreCard = arenaData.scoreboardData;
    roomTeams = roomData.data.teams;
  }

  let scores = [];
  let justScores = [];
  for (let teamName in scoreCard) {
    scores.push({ team: teamName, score: scoreCard[teamName].length });
    justScores.push(scoreCard[teamName].length);
  }
  if (scores != null && justScores != null) {
    // Sorting scores in descending order
    scores.sort(function (a, b) {
      return a.score - b.score;
    });
    scores.reverse();
  }

  const allEqual = (array) => array.every((v) => v === array[0]);

  const displayScoreCards = () => {
    if (scores[0].score === 0) {
      return (
        <div className='scoreboard-score-container'>
          <h1>No one won!</h1>
        </div>
      );
    } else if (allEqual(justScores)) {
      return (
        <div className='scoreboard-score-container'>
          <h1>It's a draw!</h1>
        </div>
      );
    } else if (scores.length === 2) {
      return (
        <div className='scoreboard-score-container'>
          <ScoreboardTeam
            rank='gold'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[0].team}
            team={roomTeams[scores[0].team]}
          />
        </div>
      );
    } else if (scores.length === 3) {
      return (
        <div className='scoreboard-score-container'>
          <ScoreboardTeam
            rank='gold'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[0].team}
            team={roomTeams[scores[0].team]}
          />
          <ScoreboardTeam
            rank='silver'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[1].team}
            team={roomTeams[scores[1].team]}
          />
        </div>
      );
    } else {
      return (
        <div className='scoreboard-score-container'>
          <ScoreboardTeam
            rank='silver'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[1].team}
            team={roomTeams[scores[1].team]}
          />
          <ScoreboardTeam
            rank='gold'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[0].team}
            team={roomTeams[scores[0].team]}
          />
          <ScoreboardTeam
            rank='bronze'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[2].team}
            team={roomTeams[scores[2].team]}
          />
        </div>
      );
    }
  };

  return (
    <div className='scoreboard-page'>
      <div className='scoreboard-back-button'>
        <Whisper
          placement='right'
          trigger='hover'
          speaker={<Tooltip>Go to Dashboard</Tooltip>}
        >
          <Icon
            onClick={() => {
              history.push('/dashboard');
            }}
            icon='back-arrow'
            size='2x'
            style={{ margin: '20px' }}
          />
        </Whisper>
      </div>
      {socket != null ? (
        <div className='scoreboard-score-container'>{displayScoreCards()}</div>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  roomData: state.roomData,
  socketData: state.socketData,
  arenaData: state.arenaData,
});
export default connect(mapStateToProps, null)(ScoreboardMain);
