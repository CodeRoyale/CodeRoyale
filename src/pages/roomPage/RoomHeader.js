import React, { useState } from 'react';
import CountBar from '../../components/countBar/CountBar';
import { millisecondsToString } from '../../utils/timeToString';
import CloseRoomView from './CloseRoomView';
import StartCompetitionButton from './StartCompetitionButton';
import profileData from '../../utils/profileData';
import { Icon } from 'rsuite';
import { Flex, Stack, Text, Progress } from '@chakra-ui/react';
import RoomInfo from './RoomInfo';

function RoomHeader({ config, state, teams, competition, admin }) {
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

  return (
    <Flex
      bg='white'
      height='150px'
      width='100%'
      alignItems='center'
      padding='1.47em'
      border='2px green dotted'
    >
      <Stack width='100%'>
        <>
          <Text>Number of Users in Room</Text>
          <Progress value={playersRoom} />
        </>
        <>
          <Text>Number of Teams in Room</Text>
          <Progress value={teamsNumber} />
        </>
      </Stack>
      {true ? (
        <Stack marginLeft='1em'>
          <StartCompetitionButton />
          <RoomInfo />
          <CloseRoomView />
        </Stack>
      ) : null}
    </Flex>
  );
}

export default RoomHeader;
