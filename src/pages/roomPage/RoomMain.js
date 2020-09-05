import React from 'react';
import './RoomMain.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../utils/mapStateToProps';
import NavBar from '../../components/navBar/NavBar';
import CreateTeamView from './CreateTeamView';
import TeamCard from './TeamCard';
import CopyRoomCodeView from './CopyRoomCodeView';
import RoomDetails from './RoomDetails';
import CloseRoomView from './CloseRoomView';
import RoomChat from './RoomChat';
import profileData from '../../utils/examples';
import StartCompetitionButton from './StartCompetitionButton';
import Arena from './Arena';

const RoomMain = ({ roomData, socketData }) => {
  // TODO: Have to implement, what happens if the user goes to create page again....

  // Initializations...
  const socket = socketData.socket;
  const accessToken = localStorage.getItem('access-token');

  // Checking all the conditions to be in the room...
  if (socket === null) {
    return <Redirect to='/lobby' />;
  } else if (accessToken === null) {
    return <Redirect to='/' />;
  }

  // Initialization after checking authorization...
  const roomTeams = roomData.data.teams;
  const roomConfig = roomData.data.config;
  const roomState = roomData.data.state;
  const admin = roomConfig.admin;
  const userName = profileData.username.toString();
  let room_id = null;

  // Setting Team Cards...
  let team_cards = [];
  for (var teamName in roomTeams) {
    team_cards.push(
      <TeamCard
        key={teamName}
        team_name={teamName}
        team={roomTeams[teamName]}
      />
    );
  }

  // Displaying Empty room on the window...
  if (team_cards.length === 0) {
    team_cards = (
      <div className='room-create-team-text-container'>
        <div className='room-create-team-text'>
          <b>
            EMPTY ROOM
            <br />
            CREATE A TEAM
          </b>
        </div>
      </div>
    );
  }

  return (
    <div className='room'>
      <div className='room-header'>
        <NavBar />
      </div>
      <div className='room-body'>
        <div className='room-left-section'>
          <CloseRoomView />

          <div className='room-copy-code'>
            <CopyRoomCodeView room_id={room_id} admin={admin} />
          </div>

          <div className='room-create-team'>
            {userName === admin ? <CreateTeamView /> : null}
          </div>

          <div className='room-details-container'>
            <RoomDetails
              config={roomConfig}
              state={roomState}
              teams={roomTeams}
            />
          </div>
          <div className='room-details-start-competitions-container'>
            <StartCompetitionButton />
          </div>
          <div>
            <Arena />
          </div>
        </div>
        <div className='room-right-section'>
          <div className='room-right-section-body'>{team_cards}</div>
          <div className='room-right-section-chat'>
            <RoomChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(RoomMain);
