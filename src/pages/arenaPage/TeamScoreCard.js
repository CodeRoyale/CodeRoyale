import React from 'react';
import { Flex, Badge } from '@chakra-ui/react';

const TeamScoreCard = ({ teamName, questionSuccess }) => {
  const questionSuccessBadge = questionSuccess ? (
    <Badge marginLeft='0.7em' colorScheme='green'>
      Submitted
    </Badge>
  ) : (
    <Badge marginLeft='0.7em' colorScheme='red'>
      !Submitted
    </Badge>
  );

  return (
    <Flex padding='0.5em' alignItems='center' width='100%'>
      <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
        Team {teamName}
      </span>
      {questionSuccessBadge}
    </Flex>
  );
};

export default TeamScoreCard;
