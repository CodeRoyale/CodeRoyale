import React from 'react';
import { Flex, Image, Spacer, Text } from '@chakra-ui/react';

const PlayerCard = ({ userImage, userName }) => {
  return (
    <Flex
      pos='relative'
      top='-50px'
      alignItems='center'
      padding='0.7em'
      width='100%'
      bgColor='white'
    >
      <Image
        borderRadius='full'
        boxSize='40px'
        src={userImage}
        alt='Profile Pic'
      />
      <Spacer />
      <Text fontSize='md'>{userName}</Text>
    </Flex>
  );
};

export default PlayerCard;
