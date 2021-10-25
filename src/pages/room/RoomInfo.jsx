import React, { useState } from 'react';
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  Input,
  InputRightElement,
  Tooltip,
  Text,
  Stack,
  Icon,
} from '@chakra-ui/react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { millisecondsToString } from '../../utils/timeToString';
import useRoom from '../../global-stores/useRoom';

const RoomInfo = () => {
  const room = useRoom((state) => state.room);

  const [copied, setCopied] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Room info
  let roomId;
  let maxQuestions;
  let maxVetoQuestions;
  let maxVotes;
  let timeLimit;
  let privateRoom;

  // Getting the room info
  if (room) {
    roomId = room.config.id;
    //! changed var names
    maxQuestions = room.competition.maxQuestions;
    maxVetoQuestions = room.competition.veto.quesCount;
    maxVotes = room.competition.veto.maxVote;
    timeLimit = room.competition.timeLimit;
    privateRoom = room.config.privateRoom;
  }

  const handleCopyRoomIdClick = () => {
    // Copying roomCode to clipboard
    navigator.clipboard.writeText(roomId);
    setCopied(true);

    // Stop showing copied tooltip after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const moreRoomInfo = (
    <>
      <Stack>
        <Text fontSize='md'>
          Maximum questions in the competition: {maxQuestions}
        </Text>
        <Text fontSize='md'>Maximum questions in veto: {maxVetoQuestions}</Text>
        <Text fontSize='md'>Maximum votes allowed in veto: {maxVotes}</Text>
        <Text fontSize='md'>
          Time limit of competion: {millisecondsToString(timeLimit)}
        </Text>
        <Text fontSize='md'>Private room: {privateRoom ? 'Yes' : 'No'}</Text>
      </Stack>
    </>
  );

  return (
    <>
      <Button
        size='sm'
        leftIcon={<Icon as={AiOutlineInfoCircle} />}
        colorScheme='codeRoyale'
        onClick={onOpen}
      >
        Room Info
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Room Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack marginBottom='1em'>{moreRoomInfo}</Stack>
            <Text fontSize='md'>Room ID</Text>
            <InputGroup size='md'>
              <Input pr='4.5rem' value={roomId} readOnly />
              <InputRightElement width='4.5rem'>
                <Tooltip label='Copied' aria-label='Room ID' isOpen={copied}>
                  <Button h='1.75rem' size='sm' onClick={handleCopyRoomIdClick}>
                    Copy
                  </Button>
                </Tooltip>
              </InputRightElement>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RoomInfo;
