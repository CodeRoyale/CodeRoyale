import React from 'react';
import './RoomMain.css';
import NavBar from '../../components/navBar/NavBar';
import CreateTeamView from './CreateTeamView';
import { Redirect } from 'react-router';

function RoomMain(props) {
  // Checking if the socket and room_id are not null...
  // Uncomment below code...
  // if (props.location.props === undefined) {
  //   return <Redirect to='/lobby' />;
  // }

  // Checking if the user is logged-in...
  const accessToken = localStorage.getItem('access-token');
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  // Initializations...
  const socket = null;
  const room_id = null;
  // Uncomment below code...
  // const socket = props.location.props.socket;
  // const room_id = props.location.props.room_id;
  // console.log('Room Created with room id: ' + room_id);

  return (
    <div className='room'>
      <div className='room-header'>
        <NavBar />
      </div>
      <div className='room-body'>
        <div className='room-create-team-container'>
          <CreateTeamView socket={socket} room_id={room_id} />
        </div>
      </div>
    </div>
  );
}

export default RoomMain;
