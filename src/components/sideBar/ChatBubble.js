import React from 'react';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';

const ChatBubble = ({ userImage, userName, userMessage, bubbleColor }) => {
  return (
    <Flex padding='0.5em' alignItems='center' bgColor={bubbleColor}>
      <Image
        cursor='pointer'
        borderRadius='full'
        boxSize='40px'
        src={userImage}
        alt='Profile Picture'
      ></Image>
      <Stack marginLeft='0.8em'>
        <Text fontWeight='bold' fontSize='sm'>
          {userName}
        </Text>
        <Text>{userMessage}</Text>
      </Stack>
    </Flex>
  );
};

export default ChatBubble;
