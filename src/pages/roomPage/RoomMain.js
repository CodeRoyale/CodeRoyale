import React, { useEffect, useState } from 'react';
import './RoomMain.css';
import { Redirect } from 'react-router';
import NavBar from '../../components/navBar/NavBar';
import CreateTeamView from './CreateTeamView';
import TeamCard from './TeamCard';
import CopyRoomCodeView from './CopyRoomCodeView';
import RoomDetails from './RoomDetails';
import ERROR_MSG from '../../utils/constants';

const RoomMain = (props) => {
  // TODO: Have to implement, what happens if the user goes to create page again....
  let socket = null;
  let room_id = null;
  let config = null;
  let state = null;
  let teams = null;
  const [roomData, setRoomData] = useState(null);

  // Getting Room Datas...
  useEffect(() => {
    if (socket !== null) {
      socket.emit('GET_ROOM', { room_id }, (data) => {
        if (data !== ERROR_MSG && roomData === null) {
          setRoomData(data);
        }
      });
    }
  });

  // Setting up config for display in room details....
  if (roomData !== null) {
    config = roomData.config;
    state = roomData.state;
    teams = roomData.teams;
  }

  // Checking if the socket and room_id are not null...
  if (props.location.props === undefined) {
    return <Redirect to='/lobby' />;
  }

  // Initializations....
  socket = props.location.props.socket;
  room_id = props.location.props.room_id;

  // Checking if the user is logged-in...
  const accessToken = localStorage.getItem('access-token');
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  //Example data....
  const data = {
    team1: ['Mayur', 'Anugya'],
    team2: ['Alan', 'joel'],
    team3: ['Justin'],
    team4: ['Donald', 'Chirag', 'Sachin', 'Sanith', 'Rahul'],
    team5: ['Sawarni', 'Swaroop'],
  };

  // Setting Team Cards...
  let team_cards = [];
  for (var team_name in data) {
    team_cards.push(
      <TeamCard key={team_name} team_name={team_name} team={data[team_name]} />
    );
  }

  return (
    <div className='room'>
      <div className='room-header'>
        <NavBar />
      </div>
      <div className='room-body'>
        <div className='room-left-section'>
          <div className='room-copy-code'>
            <CopyRoomCodeView room_id='mayur' />
          </div>

          <div className='room-create-team'>
            <CreateTeamView socket={socket} room_id={room_id} />
          </div>

          <div className='room-details-container'>
            <RoomDetails config={config} state={state} teams={teams} />
          </div>
        </div>
        <div className='room-right-section'>{team_cards}</div>
      </div>
    </div>
  );
};

export default RoomMain;
