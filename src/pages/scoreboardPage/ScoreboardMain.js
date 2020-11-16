import React from 'react';
import './ScoreboardMain.css';
import { Icon, Whisper, Tooltip } from 'rsuite';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import ScoreboardTeam from './ScoreboardTeam';

const ScoreboardMain = ({ roomData, socketData }) => {
  const history = useHistory();
  const socket = socketData.socket;

  if (socket === null) {
    history.push('/dashboard');
  }

  // Getting the scorecard and teams from lobby
  let scoreCard;
  let roomTeams;
  if (roomData.data != null) {
    scoreCard = roomData.data.competition.scoreboard; //{ asd: [], asdasd: [] }
    roomTeams = roomData.data.teams;
  }
  let scores = [];
  let justScores = [];
  for (let teamName in scoreCard) {
    scores.push({ team: teamName, score: scoreCard[teamName].length });
    justScores.push(scoreCard[teamName].length);
  }

  // Sorting scores in descending order
  scores.sort(function (a, b) {
    return a.score - b.score;
  });
  scores.reverse();

  console.log(scores);
  console.log(scoreCard);
  console.log(roomTeams);

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
            teamName={scores[0].team}
            team={['joel', 'alan']}
          />
        </div>
      );
    } else if (scores.length === 3) {
      return (
        <div className='scoreboard-score-container'>
          <ScoreboardTeam
            rank='gold'
            teamName={scores[0].team}
            team={['joel', 'alan']}
          />
          <ScoreboardTeam
            rank='silver'
            teamName={scores[1].team}
            team={['joel', 'alan']}
          />
        </div>
      );
    } else {
      return (
        <div className='scoreboard-score-container'>
          <ScoreboardTeam
            rank='silver'
            teamName={scores[1].team}
            team={['alanhenry']}
          />
          <ScoreboardTeam
            rank='gold'
            teamName={scores[0].team}
            team={['sawarni69']}
          />
          <ScoreboardTeam
            rank='bronze'
            teamName={scores[2].team}
            team={['joelmathewkoshy']}
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
      <div className='scoreboard-score-container'>{displayScoreCards()}</div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  roomData: state.roomData,
  socketData: state.socketData,
});
export default connect(mapStateToProps, null)(ScoreboardMain);
