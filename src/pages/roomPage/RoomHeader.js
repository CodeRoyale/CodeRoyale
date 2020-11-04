import React, { useState } from 'react';
import CountBar from '../../components/countBar/CountBar';
import { millisecondsToString } from '../../utils/timeToString';
import CloseRoomView from './CloseRoomView';
import StartCompetitionButton from './StartCompetitionButton';
import profileData from '../../utils/profileData';
import { Icon } from 'rsuite';

function RoomHeader({ config, state, teams, competition, admin }) {
  const [showExtraFeatures, setShowExtraFeatures] = useState(false);
  const userName = profileData.userName.toString();
  let playersRoom = 0;
  let max_perRoom = 0;
  let playersTeam = 0;
  let teamsNumber = 0;
  let max_teams = 0;
  let max_questions = 0;
  let vetoQuesCount = 0;
  let max_vote = 0;
  let timeLimit = 0;
  let privateRoom = false;

  if (
    config !== undefined &&
    state !== undefined &&
    teams !== undefined &&
    competition !== undefined &&
    config !== null &&
    state !== null &&
    teams !== null &&
    competition !== null
  ) {
    max_perRoom = config.max_perRoom;
    max_teams = config.max_teams;
    privateRoom = config.privateRoom;
    teamsNumber = Object.keys(teams).length;
    for (let team_name in teams) {
      playersTeam += teams[team_name].length;
    }
    playersRoom = playersTeam + state.bench.length;
    max_questions = competition.max_questions;
    vetoQuesCount = competition.veto.quesCount;
    max_vote = competition.veto.max_vote;
    timeLimit = competition.veto.timeLimit;
  }

  // Styles...
  const textMarginLeft = '20px';
  const textFontSize = 'small';
  let icon = 'angle-down';

  //Extra Features...
  let extraFeatureView = null;
  if (showExtraFeatures) {
    extraFeatureView = (
      <div className='room-body-header-extra'>
        <table>
          <tbody>
            <tr>
              <td>Maximum Questions</td>
              <td>
                <b>{max_questions}</b>
              </td>
              <td>Maximum Votes</td>
              <td>
                <b>{max_vote}</b>
              </td>
              <td>Number of Veto Questions</td>
              <td>
                <b>{vetoQuesCount}</b>
              </td>
            </tr>
            <tr>
              <td>Time Limit</td>
              <td>
                <b>{millisecondsToString(timeLimit)}</b>
              </td>
              <td>Private Room</td>
              <td>
                <b>{privateRoom ? 'True' : 'False'}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    icon = 'angle-up';
  } else {
    extraFeatureView = null;
    icon = 'angle-down';
  }

  return (
    <div>
      <div className='room-body-header'>
        <div className='room-body-header-left'>
          <div>
            <p
              style={{
                marginLeft: textMarginLeft,
                fontSize: textFontSize,
              }}
            >
              Number of Users
            </p>
            <CountBar count={playersRoom} total={max_perRoom} width={'100%'} />
          </div>
          <div>
            <p
              style={{
                marginLeft: textMarginLeft,
                fontSize: textFontSize,
              }}
            >
              Number of Teams
            </p>
            <CountBar count={teamsNumber} total={max_teams} width={'100%'} />
          </div>
        </div>
        {userName === admin ? (
          <div className='room-body-header-right'>
            <div>
              <StartCompetitionButton />
            </div>
            <div>
              <CloseRoomView />
            </div>
          </div>
        ) : null}
      </div>
      <div
        className='room-body-header-drawer'
        onClick={() => setShowExtraFeatures(!showExtraFeatures)}
      >
        <Icon icon={icon} />
      </div>
      {extraFeatureView}
    </div>
  );
}

export default RoomHeader;