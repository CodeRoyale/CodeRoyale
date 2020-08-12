import React from 'react';
import './RoomMain.css';
import { Redirect } from 'react-router';
import NavBar from '../../components/navBar/NavBar';
import CreateTeamView from './CreateTeamView';
import TeamCard from './TeamCard';
//import profileData from '../../utils/examples';

function RoomMain(props) {
  // TODO: pass the data object from CreatTeamView.js....
  // TODO: Have to implement, what happens if the user goes to create page again....
  // TODO: Create Copy-to-clipboard...
  // Checking if the socket and room_id are not null...
  // if (props.location.props === undefined) {
  //   return <Redirect to='/lobby' />;
  // }

  // Checking if the user is logged-in...
  const accessToken = localStorage.getItem('access-token');
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  // Initializations....
  const socket = null;
  const room_id = null;
  // const socket = props.location.props.socket;
  // const room_id = props.location.props.room_id;
  // console.log('Room Created with room id: ' + room_id);

  //Example data....
  //const { username, imageUrl } = profileData;
  // const data = { team1: [], team2: [], team3: [] };

  return (
    <div className='room'>
      <div className='room-header'>
        <NavBar />
      </div>
      <div className='room-body'>
        <div className='room-create-team-container'>
          <CreateTeamView socket={socket} room_id={room_id} />
        </div>
        <div className='room-team-display-container'>
          <TeamCard />
        </div>
      </div>
    </div>
  );
}

export default RoomMain;
