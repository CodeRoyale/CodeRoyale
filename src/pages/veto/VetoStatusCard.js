import React from 'react';
import { Flex, Image, Badge } from '@chakra-ui/react';

const VetoStatusCard = ({ userImage, userName, team, userVetoed }) => {
  const userVotedBadge = userVetoed ? (
    <Badge marginLeft='0.7em' colorScheme='green'>
      Veto
    </Badge>
  ) : (
    <Badge marginLeft='0.7em' colorScheme='red'>
      !Veto
    </Badge>
  );

  return (
    <Flex padding='0.5em' alignItems='center' width='100%'>
      <Image
        cursor='pointer'
        borderRadius='full'
        boxSize='45px'
        src={userImage}
        alt='Profile Picture'
      ></Image>
      <Flex marginLeft='0.8em' flexDir='column'>
        <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
          {userName}
        </span>
        <span style={{ fontSize: '0.8rem' }}>{team}</span>
      </Flex>
      {userVotedBadge}
    </Flex>
  );
};

export default VetoStatusCard;
