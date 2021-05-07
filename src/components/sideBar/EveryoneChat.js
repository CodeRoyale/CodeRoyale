/*
 * Everyone chat, send message to everyone in room
 */

import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import profileData from '../../utils/profileData';
import { Flex, Stack, InputGroup, Input, useToast } from '@chakra-ui/react';
import useSocket from '../../global-stores/useSocket';
import useEveryoneChat from '../../global-stores/useEveryoneChat';
import { sendEveryoneMsg } from '../../service/chatSocket';

const EveryoneChat = ({ userProfilePictures }) => {
  let chatBubbles = null;
  const toast = useToast();
  const [message, setMessage] = useState('');
  const socket = useSocket((state) => state.socket);
  const everyoneChat = useEveryoneChat((state) => state.everyoneChat);
  const setEveryoneChat = useEveryoneChat((state) => state.setEveryoneChat);

  if (everyoneChat) {
    chatBubbles = everyoneChat.map((item, index) => {
      return (
        <ChatBubble
          key={index}
          userName={item.source}
          userImage={
            item.source === 'You'
              ? profileData().picture
              : userProfilePictures[item.source]
          }
          userMessage={item.message}
          bubbleColor={index % 2 === 0 ? '#F0F0F0' : '#F9F9F9'}
        />
      );
    });
  }

  const handleChatInputKeyPressed = (event) => {
    if (event.key === 'Enter') {
      sendEveryoneMsg(
        socket,
        { message: event.target.value },
        (error, data) => {
          if (data) {
            setEveryoneChat(data);
          }

          if (error) {
            toast({
              title: 'Chat Fail',
              status: 'error',
              position: 'top-right',
              duration: 750,
              isClosable: true,
            });
          }
        }
      );
      setMessage('');
    }
  };

  return (
    <Flex
      as='div'
      pos='relative'
      paddingLeft='0.8em'
      paddingRight='0.8em'
      paddingBottom='0.8em'
      height='100%'
      width='100%'
      flexDirection='column-reverse'
    >
      <Stack marginBottom='50px' overflow='auto'>
        {chatBubbles}
      </Stack>
      <InputGroup
        size='md'
        pos='absolute'
        bottom='0'
        left='0'
        padding='inherit'
      >
        <Input
          pr='4.5rem'
          placeholder='Type a message to everyone'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleChatInputKeyPressed}
        />
      </InputGroup>
    </Flex>
  );
};

export default EveryoneChat;
