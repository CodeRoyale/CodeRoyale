import React from 'react';
import { Button, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import Timer from '../../components/timer';
import VetoStatus from './VetoStatus';
import useSocket from '../../global-stores/useSocket';
import useVetoVote from '../../global-stores/useVetoVote';
import useUserVetoed from '../../global-stores/useUserVetoed';
import { vetoVote } from '../../service/vetoSocket';

const VetoTopBar = ({ vetoTimeLimit }) => {
  const toast = useToast();
  const socket = useSocket((state) => state.socket);
  const userVetoed = useUserVetoed((state) => state.userVetoed);
  const setUserVetoed = useUserVetoed((state) => state.setUserVetoed);
  const vetoVotedQuestions = useVetoVote((state) => state.vetoVotedQuestions);

  const handleConfirmVetoVotes = () => {
    if (vetoVotedQuestions.length !== 0) {
      vetoVote(socket, { votes: vetoVotedQuestions }, (error, data) => {
        if (data) {
          setUserVetoed(true);
        }
      });
    } else {
      toast({
        title: 'Error on Veto',
        description:
          'You will need to vote for atleast 1 question to confirm your veto votes',
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      bg='white'
      height='115px'
      width='100%'
      alignItems='center'
      padding='1.47em'
    >
      <Stack width='100%'>
        <Text fontSize='md' fontWeight='bold'>
          Veto Time Left
        </Text>
        <Timer milliseconds={vetoTimeLimit} />
      </Stack>
      <Stack marginLeft='1em'>
        <VetoStatus />
        <Button
          isLoading={userVetoed}
          loadingText='Waiting for others'
          colorScheme='codeRoyale'
          size='sm'
          onClick={handleConfirmVetoVotes}
        >
          Confirm Veto
        </Button>
      </Stack>
    </Flex>
  );
};

export default VetoTopBar;
