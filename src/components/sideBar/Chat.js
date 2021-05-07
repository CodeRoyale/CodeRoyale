import React, { useEffect } from 'react';
import TeamChat from './TeamChat';
import EveryoneChat from './EveryoneChat';
import { Flex, useToast } from '@chakra-ui/react';
import useRoom from '../../global-stores/useRoom';
import useSocket from '../../global-stores/useSocket';
import useEveryoneChat from '../../global-stores/useEveryoneChat';
import useTeamChat from '../../global-stores/useTeamChat';
import { subscribeToChat } from '../../service/chatSocket';

const Chat = ({ chatType }) => {
  const toast = useToast();
  const room = useRoom((state) => state.room);
  const socket = useSocket((state) => state.socket);
  const setEveryoneChat = useEveryoneChat((state) => state.setEveryoneChat);
  const setTeamChat = useTeamChat((state) => state.setTeamChat);

  useEffect(() => {
    subscribeToChat(socket, (error, data) => {
      if (data) {
        if (data.type === 'everyone') setEveryoneChat(data);

        if (data.type === 'team') setTeamChat(data);
      }

      if (error) {
        toast({
          title: 'Chat fail',
          status: 'error',
          position: 'top-right',
          duration: 750,
          isClosable: true,
        });
      }
    });
  }, [socket, setEveryoneChat, setTeamChat, toast]);

  return (
    <Flex
      as='div'
      pos='relative'
      height='100%'
      width='100%'
      flexDir='column'
      paddingTop='115px'
    >
      {chatType === 'everyone' ? (
        <EveryoneChat
          userProfilePictures={room ? room.state.profilePictures : null}
        />
      ) : (
        <TeamChat
          userProfilePictures={room ? room.state.profilePictures : null}
        />
      )}
    </Flex>
  );
};

export default Chat;
