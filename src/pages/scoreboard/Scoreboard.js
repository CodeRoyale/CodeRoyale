import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import TeamCard from './TeamCard';
import useSocket from '../../global-stores/useSocket';
import useRoom from '../../global-stores/useRoom';
import useScoreboard from '../../global-stores/useScoreboard';

const Scoreboard = () => {
  const history = useHistory();
  const socket = useSocket((state) => state.socket);
  const room = useRoom((state) => state.room);
  const scoreboard = useScoreboard((state) => state.scoreboard);

  if (!socket) {
    history.push('/dashboard');
  }

  // After 20 secs move user to /dashboard
  setTimeout(() => {
    history.push('/dashboard');
  }, 20000);

  // Getting teams from room
  let roomTeams;
  if (room) {
    roomTeams = room.teams;
  }

  const scores = [];
  const justScores = [];
  for (const teamName in scoreboard) {
    scores.push({ team: teamName, score: scoreboard[teamName].length });
    justScores.push(scoreboard[teamName].length);
  }
  if (scores != null && justScores != null) {
    // Sorting scores in descending order
    scores.sort((a, b) => a.score - b.score);
    scores.reverse();
  }

  const allEqual = (array) => array.every((v) => v === array[0]);

  const displayScoreCards = () => {
    if (scores[0].score === 0) {
      return (
        <>
          <Text fontSize='3xl' fontWeight='bold'>
            No one won!
          </Text>
        </>
      );
    }
    if (allEqual(justScores)) {
      return (
        <>
          <Text fontSize='3xl' fontWeight='bold'>
            It's a draw!
          </Text>
        </>
      );
    }
    if (scores.length === 2) {
      return (
        <>
          <TeamCard
            rank='gold'
            userImages={room.state.profilePictures}
            teamName={scores[0].team}
            team={roomTeams[scores[0].team]}
          />
        </>
      );
    }
    if (scores.length === 3) {
      return (
        <>
          <TeamCard
            rank='gold'
            userImages={room.state.profilePictures}
            teamName={scores[0].team}
            team={roomTeams[scores[0].team]}
          />
          <TeamCard
            rank='silver'
            userImages={room.state.profilePictures}
            teamName={scores[1].team}
            team={roomTeams[scores[1].team]}
          />
        </>
      );
    }
    return (
      <>
        <TeamCard
          rank='silver'
          userImages={room.state.profilePictures}
          teamName={scores[1].team}
          team={roomTeams[scores[1].team]}
        />
        <TeamCard
          rank='gold'
          userImages={room.state.profilePictures}
          teamName={scores[0].team}
          team={roomTeams[scores[0].team]}
        />
        <TeamCard
          rank='bronze'
          userImages={room.state.profilePictures}
          teamName={scores[2].team}
          team={roomTeams[scores[2].team]}
        />
      </>
    );
  };

  return (
    <Flex bgColor='whitesmoke' width='100%' height='100%' flexDir='column'>
      <Icon
        as={BiArrowBack}
        w={7}
        h={7}
        position='absolute'
        top='0'
        left='0'
        cursor='pointer'
        marginLeft='1em'
        marginTop='1em'
        onClick={() => history.push('/dashboard')}
      />
      <Flex
        justifyContent='center'
        alignItems='center'
        width='100%'
        height='100%'
      >
        {socket ? displayScoreCards() : null}
      </Flex>
    </Flex>
  );
};

export default Scoreboard;
