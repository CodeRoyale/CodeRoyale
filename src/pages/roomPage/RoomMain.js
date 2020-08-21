import React, { useEffect, useState } from 'react';
import './RoomMain.css';
import { Redirect } from 'react-router';
import NavBar from '../../components/navBar/NavBar';
import CreateTeamView from './CreateTeamView';
import TeamCard from './TeamCard';
import CopyRoomCodeView from './CopyRoomCodeView';
import RoomDetails from './RoomDetails';
import CloseRoomView from './CloseRoomView';
import ERROR_MSG from '../../utils/constants';

const RoomMain = (props) => {
  // TODO: Have to implement, what happens if the user goes to create page again....
  let socket = null;
  let room_id = null;
  let config = null;
  let state = null;
  let teams = null;
  let teamCreated = false;
  // const [teamCreated, setTeamCreated] = useState(false);
  const [roomData, setRoomData] = useState(null);

  // Getting Room Data...
  useEffect(() => {
    if (socket !== null) {
      socket.emit('GET_ROOM', { room_id }, (data) => {
        if (data !== ERROR_MSG && roomData === null) {
          setRoomData(data);
        }
      });
    } else if (teamCreated) {
      // socket.emit('GET_ROOM', { room_id }, (data) => {
      //   if (data !== ERROR_MSG && roomData === null) {
      //     setRoomData(data);
      //   }
      // });
      console.log('teamCreated');
    }
  }, [teamCreated, socket, room_id, roomData]);

  function for indication of room creation...
  const setTeamCreated = (indication) => {
    teamCreated = indication;
    console.log(teamCreated);
  };

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

  // Setting Team Cards...
  let team_cards = [];
  for (var team_name in teams) {
    team_cards.push(
      <TeamCard
        key={team_name}
        team_name={team_name}
        team={teams[team_name]}
        socket={socket}
      />
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
            <CopyRoomCodeView room_id={room_id} />
          </div>

          <div className='room-create-team'>
            <CreateTeamView
              socket={socket}
              room_id={room_id}
              setTeamCreated={setTeamCreated}
            />
          </div>

          <div className='room-details-container'>
            <RoomDetails config={config} state={state} teams={teams} />
          </div>
          <div className='room-details-close-room-container'>
            <CloseRoomView socket={socket} />
          </div>
        </div>
        <div className='room-right-section'>{team_cards}</div>
      </div>
    </div>
  );
};

export default RoomMain;
