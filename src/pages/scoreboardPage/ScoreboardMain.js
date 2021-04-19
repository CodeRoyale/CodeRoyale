import React from 'react';
import './ScoreboardMain.css';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import ScoreboardTeam from './ScoreboardTeam';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';

const ScoreboardMain = ({ roomData, socketData, arenaData }) => {
  const history = useHistory();
  const socket = socketData.socket;

  // if (socket === null) {
  //   history.push('/dashboard');
  // }

  // After 20 secs move user to /dashboard
  // setTimeout(() => {
  //   history.push('/dashboard');
  // }, 20000);

  // Getting the scorecard and teams from lobby
  let scoreCard;
  let roomTeams;
  if (roomData.data != null && arenaData.scoreboardData != null) {
    scoreCard = arenaData.scoreboardData;
    roomTeams = roomData.data.teams;
  }

  let scores = [];
  let justScores = [];
  for (let teamName in scoreCard) {
    scores.push({ team: teamName, score: scoreCard[teamName].length });
    justScores.push(scoreCard[teamName].length);
  }
  if (scores != null && justScores != null) {
    // Sorting scores in descending order
    scores.sort(function (a, b) {
      return a.score - b.score;
    });
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
    } else if (allEqual(justScores)) {
      return (
        <>
          <Text fontSize='3xl' fontWeight='bold'>
            It's a draw!
          </Text>
        </>
      );
    } else if (scores.length === 2) {
      return (
        <>
          <ScoreboardTeam
            rank='gold'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[0].team}
            team={roomTeams[scores[0].team]}
          />
        </>
      );
    } else if (scores.length === 3) {
      return (
        <>
          <ScoreboardTeam
            rank='gold'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[0].team}
            team={roomTeams[scores[0].team]}
          />
          <ScoreboardTeam
            rank='silver'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[1].team}
            team={roomTeams[scores[1].team]}
          />
        </>
      );
    } else {
      return (
        <>
          <ScoreboardTeam
            rank='silver'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[1].team}
            team={roomTeams[scores[1].team]}
          />
          <ScoreboardTeam
            rank='gold'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[0].team}
            team={roomTeams[scores[0].team]}
          />
          <ScoreboardTeam
            rank='bronze'
            userImages={roomData.data.state.profilePictures}
            teamName={scores[2].team}
            team={roomTeams[scores[2].team]}
          />
        </>
      );
    }
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
const mapStateToProps = (state) => ({
  roomData: state.roomData,
  socketData: state.socketData,
  arenaData: state.arenaData,
});
export default connect(mapStateToProps, null)(ScoreboardMain);
