import React, { useState, useEffect } from 'react';
import ProfileButton from '../../components/profileButton/ProfileButton';
import profileData from '../../utils/profileData';
import ArenaProblem from './ArenaProblem';
import ArenaSolution from './ArenaSolution';
import { connect } from 'react-redux';
import { getQuestion } from '../../actions/arenaActions';
import Chat from '../../components/chat/Chat';
import questions from '../../utils/exampleQuestion';
import QuestionStatus from '../../components/questionStatus/QuestionStatus';
import './ArenaMain.css';

const ArenaMain = ({ vetoData, socketData, roomData, getQuestion }) => {
  let quesIndex = 0;
  let quesList = null;
  const socket = socketData.socket;

  // Change this username with real username of the user....
  const username = 'sawarni99';
  let teamName = null;
  let completedQues = [];

  // Getting the team name...
  if(roomData.data !== null){
    for(let team in roomData.data.teams){
      if(roomData.data.teams[team].includes(username)){
        teamName = team;
      }
    }
    completedQues = roomData.data.competition.scoreboard[teamName];
  }

  // Fetching the questions from qapi
  useEffect(() => {
    if (vetoData.contestQuestionIDs !== null) {
      getQuestion(vetoData.contestQuestionIDs);
    }
  }, [vetoData.contestQuestionIDs, getQuestion]);


  // Put all the questions in quesList from redux...
  if (questions !== undefined) {
    quesList = questions.message;
  }

  // Setting the question to display...
  const [quesCode, setQuesCode] = useState(quesList[0].problemCode);
  for(let i in quesList){
    if(quesList[i].problemCode === quesCode){
      quesIndex = i;
      break;
    }
  }
  const currentQuestion = quesList[quesIndex];


  // Question Status...
  let quesCodes = [];
  for(let i in quesList){
    quesCodes.push(quesList[i].problemCode);
  }
  const quesStatusView = quesCodes.map(code => 
    <QuestionStatus
      key={code} 
      code={code}
      status={completedQues.includes(code) ? 1 : null}
      onClick = {()=>setQuesCode(code)} />
  )

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

  return (
    <div className='arena'>
      <div className='arena-body'>
        <div className='arena-left'>
          <ArenaProblem currentQuestion={currentQuestion} />
          <ArenaSolution socket = {socket}/>
        </div>
        <div className='arena-right'>
          <div>
            <div className='arena-profile'>
              <ProfileButton profileData={profileData} />
              <p className='arena-profile-name'>Sawarni Swaroop</p>
            </div>
            <div className='arena-divider' />
          </div>
          <Header name='Question' icon={question_icon} />
          <div className='arena-question-status'>
            {quesStatusView}
          </div>
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
};

const mapStateToProps = (state) => ({
  vetoData: state.vetoData,
  socketData: state.socketData,
  arenaData: state.arenaData,
  roomData: state.roomData
});

export default connect(mapStateToProps, { getQuestion })(ArenaMain);

// import React, { useState, useEffect } from 'react';
// import NavBar from '../../components/navBar/NavBar';
// import './ArenaMain.css';
// import Problem from './Problem';
// import Chat from './Chat';
// import Solution from './Solution';
// import { Redirect } from 'react-router';
// import { Loader } from 'rsuite';
// import { connect } from 'react-redux';
// import { getQuestion } from '../../actions/arenaActions';

// const ArenaMain = ({ socketData, arenaData, vetoData, getQuestion }) => {
//   const socket = socketData.socket;
//   const [currentQuestion, setCurrentQuestion] = useState();

//   useEffect(() => {
//     if (vetoData.contestQuestionIDs !== null) {
//       getQuestion(vetoData.contestQuestionIDs);
//     }
//   }, [vetoData.contestQuestionIDs, getQuestion]);

//   if (socket === null) {
//     return <Redirect to='/lobby' />;
//   }

//   const handleGetCurrQuestion = (data) => {
//     setCurrentQuestion(data);
//   };

//   let content = (
//     <div className='arena-page'>
//       <div>
//         <NavBar loggedIn={true} />
//       </div>

//       <div className='arena-body'>
//         <div className='left-container'>
//           <Problem
//             questions={arenaData.questions}
//             getCurrentQuestion={handleGetCurrQuestion}
//           />
//           <Chat socket={socket} />
//         </div>

//         <div className='right-container'>
//           <Solution
//             socket={socket}
//             questions={arenaData.questions}
//             currentQuestion={currentQuestion}
//           />
//         </div>
//       </div>
//     </div>
//   );

//   if (arenaData.isLoading) {
//     content = (
//       <div className='arena-page'>
//         <div>
//           <NavBar />
//         </div>
//         <div className='arena-page-loading'>
//           <Loader size='md' content='Setting up your coding environment...' />
//         </div>
//       </div>
//     );
//   }

//   return content;
// };

// const mapStateToProps = (state) => ({
//   socketData: state.socketData,
//   vetoData: state.vetoData,
//   arenaData: state.arenaData,
// });

// export default connect(mapStateToProps, { getQuestion })(ArenaMain);
