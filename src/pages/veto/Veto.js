import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import SideBar from '../../components/sideBar';
import VetoBody from './VetoBody';
import useSocket from '../../global-stores/useSocket';
import useRoom from '../../global-stores/useRoom';
import useVetoedUsers from '../../global-stores/useVetoedUsers';
import useCompQuestionIds from '../../global-stores/useCompQuestionIds';
import { vetoStatus, vetoStop } from '../../service/vetoSocket';

const Veto = () => {
  const history = useHistory();
  const socket = useSocket((state) => state.socket);
  const room = useRoom((state) => state.room);
  const setVetoedUsers = useVetoedUsers((state) => state.setVetoedUsers);
  const setCompQuestionIds = useCompQuestionIds(
    (state) => state.setCompQuestionIds
  );

  if (!socket) {
    history.push('/dashboard');
  }

  // Fetching the room details beforehand
  // To make sure render does not break due to room being null
  let vetoTimeLimit;
  if (room) {
    vetoTimeLimit = room.competition.veto.timeLimit;
  }

  // Starting the listeners for when server sends VETO_STOP and USER_VOTED
  useEffect(() => {
    vetoStop(socket, (error, data) => {
      if (data) {
        setCompQuestionIds(data);
        history.push('/arena');
      }
    });

    vetoStatus(socket, (error, data) => {
      if (data) {
        setVetoedUsers(data.userName);
      }
    });
  }, [socket, setVetoedUsers, setCompQuestionIds, history]);

  return (
    <Flex pos='relative'>
      <SideBar />
      <VetoBody vetoTimeLimit={vetoTimeLimit} />
    </Flex>
  );
};

export default Veto;
