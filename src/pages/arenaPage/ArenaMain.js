import React, { useState, useEffect } from 'react';
import profileData from '../../utils/profileData';
import ArenaProblem from './ArenaProblem';
import ArenaSolution from './ArenaSolution';
import ArenaScore from './ArenaScore';
import { connect } from 'react-redux';
import { getQuestion, competitionStopped } from '../../actions/arenaActions';
import Chat from '../../components/chat/Chat';
import QuestionStatus from '../../components/questionStatus/QuestionStatus';
import { Loader } from 'rsuite';
import { useHistory } from 'react-router-dom';
import './ArenaMain.css';

const ArenaMain = ({
  vetoData,
  socketData,
  arenaData,
  roomData,
  getQuestion,
  competitionStopped,
}) => {
  let quesIndex = 0;
  let quesList = null;
  let currentQuestion = null;
  const socket = socketData.socket;
  const PROBLEM = 'Problem';
  const SCOREBOARD = 'Scoreboard';
  const [arenaSection, setArenaSection] = useState(PROBLEM);
  const username = profileData().username;
  const history = useHistory();
  let teamName = null;
  let completedQues = [];

  // Getting the team name...
  if (roomData.data !== null) {
    for (let team in roomData.data.teams) {
      if (roomData.data.teams[team].includes(username)) {
        teamName = team;
      }
    }
    if (roomData.data.competition.scoreboard[teamName] !== undefined) {
      completedQues = roomData.data.competition.scoreboard[teamName];
    }
  }

  // Fetching the questions from qapi
  useEffect(() => {
    if (vetoData.contestQuestionIDs !== null) {
      getQuestion(vetoData.contestQuestionIDs);
    }
  }, [vetoData.contestQuestionIDs, getQuestion]);

  // Initializing the listener for checking is competition stopped
  useEffect(() => {
    if (socket !== null) {
      competitionStopped(socket);
    }
  }, [competitionStopped, socket]);

  // Move to scoreboard once the competition stops
  if (arenaData.competitionStopped) {
    history.push('/scoreboard');
  }

  // Put all the questions in quesList from redux...
  if (arenaData.questions !== undefined && !arenaData.isLoading) {
    quesList = arenaData.questions.payload.data;
  }

  // Setting the question to display...
  let firstQuestion = null;
  if (quesList !== null && quesList !== undefined) {
    firstQuestion = quesList[0].problemCode;
  }
  const [quesCode, setQuesCode] = useState(firstQuestion);

  if (quesList !== null && quesList !== undefined) {
    for (let i in quesList) {
      if (quesList[i].problemCode === quesCode) {
        quesIndex = i;
        break;
      }
    }
    currentQuestion = quesList[quesIndex];
  }

  // Question Status...
  let quesCodes = [];
  for (let i in quesList) {
    quesCodes.push(quesList[i].problemCode);
  }

  const quesStatusView = quesCodes.map((code) => (
    <QuestionStatus
      key={code}
      code={code}
      status={completedQues.includes(code) ? 1 : null}
      onClick={() => setQuesCode(code)}
    />
  ));

  // Header...
  const chat_icon = 'chat-arena.svg';
  const question_icon = 'problem.svg';
  const Header = ({ name, icon }) => {
    const icon_path = '/images/' + icon;
    return (
      <div className='arena-side-bar-header'>
        <img
          style={{ height: '25px', width: '25px' }}
          src={icon_path}
          alt='null'
        />
        <b>
          <p style={{ fontSize: '16px', marginLeft: '4px' }}>{name}</p>
        </b>
      </div>
    );
  };

  // Switching sections in arena...
  let arenaSectionView = null;
  if (arenaSection === PROBLEM) {
    arenaSectionView = <ArenaProblem currentQuestion={currentQuestion} />;
  } else if (arenaSection === SCOREBOARD) {
    arenaSectionView = <ArenaScore quesCodes={quesCodes} />;
  }

  // Style of arena section switching...
  const styleArenaTopSection = {
    borderBottom: 'solid #DD4814',
    background: 'rgba(221, 70, 20, 0.05)',
  };
  let problemOptionStyle = null;
  let scoreboardOptionStyle = null;
  if (arenaSection === PROBLEM) {
    problemOptionStyle = styleArenaTopSection;
    scoreboardOptionStyle = null;
  } else if (arenaSection === SCOREBOARD) {
    scoreboardOptionStyle = styleArenaTopSection;
    problemOptionStyle = null;
  }

  // Default content
  let content = (
    <div className='arena-page'>
      <div className='arena-body'>
        <div className='arena-left'>
          <div className='arena-left-top'>
            <div className='arena-left-top-sections'>
              <div
                style={problemOptionStyle}
                onClick={() => setArenaSection(PROBLEM)}
                className='arena-left-top-option'
              >
                {PROBLEM}
              </div>

              <div
                style={scoreboardOptionStyle}
                onClick={() => setArenaSection(SCOREBOARD)}
                className='arena-left-top-option'
              >
                {SCOREBOARD}
              </div>
            </div>

            <div>{arenaSectionView}</div>
          </div>
          <ArenaSolution socket={socket} currentQuestion={currentQuestion} />
        </div>
        <div className='arena-right'>
          <div>
            <div className='arena-profile'>
              {/* <ProfileButton profileData={profileData} /> */}
              <p className='arena-profile-name'>{profileData().userName}</p>
            </div>
            <div className='arena-divider' />
          </div>
          <Header name='Question' icon={question_icon} />
          <div className='arena-question-status'>{quesStatusView}</div>
          <Header name='Chat' icon={chat_icon} />
          <div>
            <Chat
              style={{ height: '52%', position: 'absolute' }}
              restricted={true}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (arenaData.isLoading) {
    content = (
      <div className='arena-page-loading'>
        <Loader size='sm' content='Setting up your coding environment...' />
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  vetoData: state.vetoData,
  socketData: state.socketData,
  arenaData: state.arenaData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { getQuestion, competitionStopped })(
  ArenaMain
);
