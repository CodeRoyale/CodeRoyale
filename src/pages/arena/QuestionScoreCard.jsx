import React from 'react';
import { Stack, Flex, Badge, Text } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const QuestionScoreCard = ({ problemCode, teamsList, scoreboard }) => {
  const teamScoreCards = teamsList.map((team) => (
    <Flex key={uuidv4()} padding='0.5em' alignItems='center' width='100%'>
      <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
        Team {team}
      </span>
      {scoreboard[team].includes(problemCode) ? (
        <Badge marginLeft='0.7em' colorScheme='green'>
          Submitted
        </Badge>
      ) : (
        <Badge marginLeft='0.7em' colorScheme='red'>
          !Submitted
        </Badge>
      )}
    </Flex>
  ));

  return (
    <Stack>
      <Text>{problemCode}</Text>
      {teamScoreCards}
    </Stack>
  );
};

export default QuestionScoreCard;
