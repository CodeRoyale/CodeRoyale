import React from 'react';
import { Flex } from '@chakra-ui/layout';
import CreateTeamView from './CreateTeamView';
import { connect } from 'react-redux';
import TeamCard from './TeamCard';
import profileData from '../../utils/profileData';

const RoomTeams = ({ roomData }) => {
  const userName = profileData().userName;
  let roomTeams, roomConfig, roomAdmin;

  if (roomData.data) {
    roomTeams = roomData.data.teams;
    roomConfig = roomData.data.config;
    roomAdmin = roomData.data.config.admin;
  }

  // Setting Team Cards...
  let team_cards = [];
  for (var teamName in roomTeams) {
    team_cards.push(
      <TeamCard
        key={teamName}
        team_name={teamName}
        totalUsers={roomConfig['max_perTeam']}
        users={roomTeams[teamName]}
      />
    );
  }

  return (
    <Flex padding='0.4em'>
      {team_cards}
      {userName === roomAdmin ? <CreateTeamView /> : null}
    </Flex>
  );
};

export const mapStateToProps = (state) => ({
  roomData: state.roomData,
});

export default connect(mapStateToProps, null)(RoomTeams);
