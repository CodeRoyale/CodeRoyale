import React from 'react';
import './RoomMain.css';
import { Redirect } from 'react-router';
import NavBar from '../../components/navBar/NavBar';
import CreateTeamView from './CreateTeamView';
import TeamCard from './TeamCard';
import CopyRoomCodeView from './CopyRoomCodeView';

function RoomMain(props) {
  // TODO: pass the data object from CreatTeamView.js....
  // TODO: Have to implement, what happens if the user goes to create page again....
  // TODO: Create Copy-to-clipboard...

  // Checking if the socket and room_id are not null...
  // if (props.location.props === undefined) {
  //   return <Redirect to='/lobby' />;
  // }

  // Initializations....
  // const socket = props.location.props.socket;
  // const room_id = props.location.props.room_id;
  // console.log('Room Created with room id: ' + room_id);

  // Checking if the user is logged-in...
  const accessToken = localStorage.getItem('access-token');
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  //Example data....
  const socket = null;
  const room_id = null;
  const data = {
    team1: ['Mayur', 'Anugya'],
    team2: ['Alan', 'joel'],
    team3: ['Justin'],
    team4: ['Donald', 'Chirag', 'Sachin', 'Sanith'],
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
          <div className='room-line'></div>
          <div className='room-create-team'>
            <CreateTeamView socket={socket} room_id={room_id} />
          </div>
          <div className='room-line'></div>
        </div>
        <div className='room-right-section'>{team_cards}</div>
      </div>
    </div>
  );
}

export default RoomMain;
