import React from 'react';

function RoomDetails({ config, state, teams }) {
  let admin = null;
  // let createdAt = null;
  // let id = null;
  let max_perRoom = 0;
  let max_perTeam = 0;
  let max_teams = 0;
  let privateRoom = 0;
  let playersRoom = 0;
  let playersTeam = 0;
  let teamsNumber = 0;
  console.log(teams);

  if (config !== null && state !== null && teams !== null) {
    admin = config.admin;
    // createdAt = config.createdAt;
    // id = config.id;
    max_perRoom = config.max_perRoom;
    max_perTeam = config.max_perTeam;
    privateRoom = config.privateRoom;
    max_teams = config.max_teams;
    playersRoom = state.bench.length;
    teamsNumber = Object.keys(teams).length;
    for (let key in teams) {
      playersTeam += teams[key].length;
    }
  }
  return (
    <div className='room-details'>
      <div className='room-details-heading'>
        <b>Room Details</b>
      </div>
      <div className='room-details-section'>
        <table>
          <tbody>
            <tr>
              <td>
                <div className='room-details-left-section'>Room Admin:</div>
              </td>
              <td>
                <div className='room-details-right-section'>
                  <b>{admin}</b>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='room-details-left-section'>
                  No. of players in room:{' '}
                </div>
              </td>
              <td>
                <div className='room-details-right-section'>
                  <b>{playersRoom}</b>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='room-details-left-section'>
                  Max players in room:{' '}
                </div>
              </td>
              <td>
                <div className='room-details-right-section'>
                  <b>{max_perRoom}</b>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='room-details-left-section'>
                  No. of players in teams:{' '}
                </div>
              </td>
              <td>
                <div className='room-details-right-section'>
                  <b>{playersTeam}</b>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='room-details-left-section'>
                  Max players per team:{' '}
                </div>
              </td>
              <td>
                <div className='room-details-right-section'>
                  <b>{max_perTeam}</b>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='room-details-left-section'>
                  No. of players left to join team:
                </div>
              </td>
              <td>
                <div className='room-details-right-section'>
                  <b>{playersRoom - playersTeam}</b>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='room-details-left-section'>No. of teams: </div>
              </td>
              <td>
                <div className='room-details-right-section'>
                  <b>{teamsNumber}</b>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='room-details-left-section'>
                  Max no. of teams:{' '}
                </div>
              </td>
              <td>
                <div className='room-details-right-section'>
                  <b>{max_teams}</b>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='room-details-left-section'>Private Room: </div>
              </td>
              <td>
                <div className='room-details-right-section'>
                  <b>{privateRoom ? 'Yes' : 'No'}</b>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoomDetails;
