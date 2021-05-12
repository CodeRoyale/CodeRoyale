import React, { useState } from 'react';
import {
  Stack,
  Text,
  Flex,
  Select,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { timeToString } from '../../utils/timeToString';
import useSocket from '../../global-stores/useSocket';
import useRoom from '../../global-stores/useRoom';
import { createRoom } from '../../service/roomSocket';

const CreateRoom = () => {
  const socket = useSocket((state) => state.socket);
  const toast = useToast();
  const setRoom = useRoom((state) => state.setRoom);
  const history = useHistory();

  const milliseconds = 60 * 60 * 1000;

  const [maxTeams, setMaxTeams] = useState(2);
  const [maxPerTeam, setMaxPerTeam] = useState(1);
  const [maxPerRoom, setMaxPerRoom] = useState(2);
  const [timeLimit, setTimeLimit] = useState(0.5 * milliseconds);
  const [maxQuestions, setMaxQuestions] = useState(3);
  const [maxVetoQuestions, setMaxVetoQuestions] = useState(3);
  const [maxVetoVotes, setMaxVetoVotes] = useState(1);
  const [privateRoom, setPrivateRoom] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const numberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const timeOptions = [0.5, 1, 3, 6, 12, 24, 48];
  const vetoVoteOptions = [];

  for (let i = 0; i < numberOptions.length; i += 1) {
    const number = numberOptions[i];
    numberOptions[i] = { label: number, value: number };
  }

  for (let i = 0; i < timeOptions.length; i += 1) {
    const time = timeOptions[i];
    timeOptions[i] = {
      label: timeToString(time),
      value: time * milliseconds,
    };
  }

  for (let i = 1; i < maxVetoQuestions; i += 1) {
    vetoVoteOptions.push({ label: i, value: i });
  }

  // Creating options for create room dialog
  const maxTeamOptions = numberOptions.map((item) => (
    <option key={uuidv4()} value={item.value}>
      {item.label}
    </option>
  ));

  const maxRoomMemberOptions = numberOptions.map((item) => (
    <option key={uuidv4()} value={item.value}>
      {item.label}
    </option>
  ));

  const maxTeamMemberOptions = numberOptions.map((item) => (
    <option key={uuidv4()} value={item.value}>
      {item.label}
    </option>
  ));

  const maxQuestionsOption = numberOptions.map((item) => (
    <option key={uuidv4()} value={item.value}>
      {item.label}
    </option>
  ));

  const maxVetoQuestionsOptions = numberOptions.map((item) => (
    <option key={uuidv4()} value={item.value}>
      {item.label}
    </option>
  ));

  const maxVetoVotesOptions = vetoVoteOptions.map((item) => (
    <option key={uuidv4()} value={item.value}>
      {item.label}
    </option>
  ));

  const maxTimeLimitOptions = timeOptions.map((item) => (
    <option key={uuidv4()} value={item.value}>
      {item.label}
    </option>
  ));

  const handleCreateRoom = () => {
    createRoom(
      socket,
      {
        maxTeams,
        maxPerTeam,
        maxPerRoom,
        privateRoom,
        maxQuestions,
        maxVetoQuestions,
        maxVetoVotes,
        timeLimit,
      },
      (error, data) => {
        if (data) {
          toast({
            title: 'Room Created!',
            status: 'success',
            position: 'top-right',
            duration: 750,
            isClosable: true,
          });
          setRoom(data);
          history.push('/room');
        }

        if (error) {
          toast({
            title: 'Error on Create Room',
            description:
              'Some error occurred. Our team is in the process of fixing it',
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
        }
      }
    );
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} marginRight='1em' colorScheme='codeRoyale'>
        Create Room
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Stack width='50%'>
                <Text>Maximum Teams</Text>
                <Select
                  value={maxTeams}
                  onChange={(e) => setMaxTeams(e.target.value)}
                >
                  {maxTeamOptions}
                </Select>
                <Text>Maximum Members in Room</Text>
                <Select
                  value={maxPerRoom}
                  onChange={(e) => setMaxPerRoom(e.target.value)}
                >
                  {maxRoomMemberOptions}
                </Select>
                <Text>Maximum Members in a Team</Text>
                <Select
                  value={maxPerTeam}
                  onChange={(e) => setMaxPerTeam(e.target.value)}
                >
                  {maxTeamMemberOptions}
                </Select>
                <Text>Private Room?</Text>
                <Switch
                  colorScheme='codeRoyale'
                  isChecked={privateRoom}
                  onChange={() => setPrivateRoom(!privateRoom)}
                />
              </Stack>
              <Stack width='50%'>
                <Text>Maximum Questions</Text>
                <Select
                  value={maxQuestions}
                  onChange={(e) => setMaxQuestions(e.target.value)}
                >
                  {maxQuestionsOption}
                </Select>
                <Text>Maximum Veto Questions</Text>
                <Select
                  value={maxVetoQuestions}
                  onChange={(e) => setMaxVetoQuestions(e.target.value)}
                >
                  {maxVetoQuestionsOptions}
                </Select>
                <Text>Maximum Veto Votes</Text>
                <Select
                  value={maxVetoVotes}
                  onChange={(e) => setMaxVetoVotes(e.target.value)}
                >
                  {maxVetoVotesOptions}
                </Select>
                <Text>Time Limit</Text>
                <Select
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                >
                  {maxTimeLimitOptions}
                </Select>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='codeRoyale' mr={3} onClick={handleCreateRoom}>
              Create Room
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateRoom;
