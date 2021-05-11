import React, { useState } from 'react';
import { ERROR_MSG } from '../../utils/constants';
import { Button, Icon, useToast } from '@chakra-ui/react';
import { IoMdArrowForward } from 'react-icons/io';
import useSocket from '../../global-stores/useSocket';
import { startCompetition } from '../../service/vetoSocket';

const StartCompetition = () => {
  const socket = useSocket((state) => state.socket);
  const [startCompetitionLoading, setStartCompetitionLoading] = useState(false);
  const toast = useToast();

  const handleStartCompetition = () => {
    startCompetition(socket, (error, data) => {
      if (data) {
        setStartCompetitionLoading(true);
      }

      if (error) {
        toast({
          title: 'Error on Veto',
          description: ERROR_MSG,
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Button
      leftIcon={<Icon as={IoMdArrowForward} />}
      colorScheme='green'
      size='sm'
      onClick={handleStartCompetition}
      isLoading={startCompetitionLoading}
      loadingText='Waiting for veto to start'
    >
      Start Competition
    </Button>
  );
};

export default StartCompetition;
