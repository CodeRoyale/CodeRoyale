import React, { useState } from 'react';
import { Animation } from 'rsuite';

function RoomDetails({ config, state, teams }) {
  let playersRoom = 0;
  let max_perRoom = 0;
  let playersTeam = 0;
  let max_perTeam = 0;
  let teamsNumber = 0;
  let max_teams = 0;
  let privateRoom = false;

  let classNameDropDownImage = '';
  const [moreDetailsClicked, setMoreDetailsClicked] = useState(false);
  const { Collapse } = Animation;
  const panel = (
    <div>
      <div className='room-details-divider'></div>
      <div className='room-details-panel-container'>
        <div className='room-details-panel-data-label'>Max Users</div>
        <div>{max_perRoom}</div>
      </div>
      <div className='room-details-panel-container'>
        <div className='room-details-panel-data-label'>Max Users per Team</div>
        <div>{max_perTeam}</div>
      </div>
      <div className='room-details-panel-container'>
        <div className='room-details-panel-data-label'>Max Teams</div>
        <div>{max_teams}</div>
      </div>
      <div className='room-details-panel-container'>
        <div className='room-details-panel-data-label'>Private Room</div>
        <div>{privateRoom ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );

  if (moreDetailsClicked) {
    classNameDropDownImage = 'room-details-more-image-clicked';
  } else {
    classNameDropDownImage = 'room-details-more-image';
  }
  if (config !== null && state !== null && teams !== null) {
    max_perRoom = config.max_perRoom;
    max_perTeam = config.max_perTeam;
    max_teams = config.max_teams;
    privateRoom = config.privateRoom;
    teamsNumber = Object.keys(teams).length;
    for (let team_name in teams) {
      playersTeam += teams[team_name].length;
    }
    playersRoom = playersTeam + state.bench.length;
  }
  return (
    <div className='room-details'>
      <div className='room-details-main-container'>
        <div className='room-details-main-users'>
          <div>
            <b>Users</b>
          </div>
          <div className='room-details-main-number'>{playersRoom}</div>
        </div>
        <div className='room-details-divider'></div>
        <div className='room-details-main-teams'>
          <div>
            <b>Teams</b>
          </div>
          <div className='room-details-main-number'>{teamsNumber}</div>
        </div>
      </div>
      <div className='room-details-more-container'>
        <div
          className='room-details-more-button'
          onClick={() => setMoreDetailsClicked((data) => !data)}
        >
          <div className='room-details-more-text'>More Details</div>
          <div className='room-details-more-image-container'>
            <img
              className={classNameDropDownImage}
              src='/images/down-arrow.svg'
              alt=''
            />
          </div>
        </div>
        <div>
          <Collapse in={moreDetailsClicked}>{panel}</Collapse>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
