import React, { useState, useEffect } from 'react';
import './TeamCard.css';
import CountBar from '../countBar/CountBar';
import profileData from '../../utils/examples';
import { joinTeam } from '../../actions/teamActions';
import { connect } from 'react-redux';

function TeamCard({ team_name, totalUsers, users, socketData, joinTeam }) {
  const [teamButtonClicked, setTeamButtonClicked] = useState(false);
  const userName = profileData.username; // Get this from API...
  const imageUrl = profileData.imageUrl; // Get this from API...
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
        setTeamButtonClicked(false);
      }
    }
  }, [teamButtonClicked, buttonText, joinTeam, socket, team_name]);

  // UserCard...
  const userCards = users.map((user) => (
    <div key={user} className='user-card'>
      <img className='user-card-image' src={imageUrl} alt='' />
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
            <b>{buttonText}</b>
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

export default connect(mapStateToProps, { joinTeam })(TeamCard);
