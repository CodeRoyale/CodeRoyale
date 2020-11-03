import React, { useState, useEffect } from 'react';
import './TeamCard.css';
import CountBar from '../countBar/CountBar';
import profileData from '../../utils/profileData';
import { joinTeam, leaveTeam } from '../../actions/teamActions';
import { connect } from 'react-redux';

function TeamCard({
  team_name,
  totalUsers,
  users,
  socketData,
  roomData,
  joinTeam,
  leaveTeam,
}) {
  const [teamButtonClicked, setTeamButtonClicked] = useState(false);
  const userName = profileData.userName.toString();
  const socket = socketData.socket;
  const userCount = users.length;
  let buttonText = '+';

  // Checking if user is in the team or not...
  if (users.includes(userName)) {
    buttonText = '-';
  }

  //Join or leave team...
  useEffect(() => {
    if (teamButtonClicked) {
      if (buttonText === '+') {
        joinTeam(socket, { team_name });
      } else if (buttonText === '-') {
        leaveTeam(socket);
      }
      setTeamButtonClicked(false);
    }
  }, [teamButtonClicked, buttonText, joinTeam, leaveTeam, socket, team_name]);

  // UserCard...
  const userCards = users.map((user) => (
    <div key={user} className='user-card'>
      <img
        className='user-card-image'
        src={roomData.data.state.profilePictures[user]}
        alt=''
      />
      <span className='user-card-text'>
        <b>{user}</b>
      </span>
    </div>
  ));

  return (
    <div>
      <div className='team-card'>
        <div className='team-card-name'>{team_name}</div>
        <div className='team-card-progress'>
          <CountBar count={userCount} total={totalUsers} />
        </div>
        <div className='team-card-users'>{userCards}</div>
        <div className='team-card-button-container'>
          <button
            className='team-card-button'
            onClick={() => setTeamButtonClicked(true)}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export const mapStateToProps = (state) => {
  return {
    socketData: state.socketData,
    roomData: state.roomData,
    teamData: state.teamData,
  };
};

export default connect(mapStateToProps, { joinTeam, leaveTeam })(TeamCard);
