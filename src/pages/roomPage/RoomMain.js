import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar/NavBar';
import RoomHeader from './RoomHeader';
import RoomRight from './RoomRight';
import FloatingButton from '../../components/floatingButton/FloatingButton';
import CreateTeamView from './CreateTeamView';
import { getRoom } from '../../actions/roomActions';
import { resetTeamAction } from '../../actions/teamActions';
import { vetoStart } from '../../actions/vetoActions';
import { TEAM_CREATED, TEAM_JOINED, TEAM_LEFT } from '../../utils/constants';
import { Alert } from 'rsuite';
import { connect } from 'react-redux';
import profileData from '../../utils/profileData';
import { useHistory } from 'react-router-dom';
import './RoomMain.css';
import { Flex } from '@chakra-ui/layout';
import SideBar from '../../components/sideBar/SideBar';
import RoomBody from './RoomBody';

const RoomMain = ({
  roomData,
  socketData,
  teamData,
  getRoom,
  resetTeamAction,
  vetoData,
  vetoStart,
}) => {
  const [createTeamShow, setCreateTeamShow] = useState(false);
  const socket = socketData.socket;
  const userName = profileData().userName.toString();
  const history = useHistory();

  // Room Details...
  let roomTeams, roomConfig, roomState, roomCompetition, room_id, admin;
  if (roomData.data !== null) {
    roomTeams = roomData.data.teams;
    roomConfig = roomData.data.config;
    roomState = roomData.data.state;
    roomCompetition = roomData.data.competition;
    if (roomConfig !== undefined) {
      room_id = roomConfig.id;
      admin = roomConfig.admin;
    }
  }

  // Get room & check if veto started
  useEffect(() => {
    if (socket !== null && teamData.type !== '' && room_id !== undefined) {
      getRoom(socket, { room_id });
    }

    if (socket !== null) {
      vetoStart(socket, history);
    }
  }, [room_id, socket, getRoom, vetoStart, teamData.type, history]);

  // Display Alert on every action...
  useEffect(() => {
    switch (teamData.type) {
      case TEAM_CREATED:
        Alert.success('Team Created');
        resetTeamAction();
        break;
      case TEAM_JOINED:
        Alert.success('You have joined a team');
        resetTeamAction();
        break;
      case TEAM_LEFT:
        Alert.success('You have left a team');
        resetTeamAction();
        break;
      default:
        break;
    }
    if (teamData.error !== null) {
      Alert.error(teamData.error);
      resetTeamAction();
    }
  });

  // Checking all the conditions to be in the room...
  // if (socket === null) {
  //   history.push('/dashboard');
  // }

  if (vetoData.vetoStarted) {
    history.push('/veto');
  }

  return (
    <Flex pos='relative'>
      <SideBar />
      <RoomBody />
    </Flex>
  );
};

export const mapStateToProps = (state) => {
  return {
    roomData: state.roomData,
    teamData: state.teamData,
    socketData: state.socketData,
    vetoData: state.vetoData,
  };
};
export default connect(mapStateToProps, {
  getRoom,
  vetoStart,
  resetTeamAction,
})(RoomMain);
