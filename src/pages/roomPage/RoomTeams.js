import React from 'react';
import { Flex } from '@chakra-ui/layout';
import CreateTeamView from './CreateTeamView';
import { connect } from 'react-redux';
import TeamCard from '../../components/teamCard/TeamCard';

const RoomTeams = ({ roomData }) => {
  let roomTeams, roomConfig;

  if (roomData.data) {
    roomTeams = roomData.data.teams;
    roomConfig = roomData.data.config;
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
    <Flex
      bgColor='whitesmoke'
      height='100%'
      padding='1em'
      border='2px red dotted'
    >
      {team_cards}
      <CreateTeamView />
    </Flex>
  );
};

export const mapStateToProps = (state) => ({
  roomData: state.roomData,
});

export default connect(mapStateToProps, null)(RoomTeams);
