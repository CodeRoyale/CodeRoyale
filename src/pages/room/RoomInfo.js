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
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { millisecondsToString } from '../../utils/timeToString';

const RoomInfo = ({ roomData }) => {
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
  if (roomData.data) {
    roomId = roomData.data.config.id;
    maxQuestions = roomData.data.competition.max_questions;
    maxVetoQuestions = roomData.data.competition.veto.quesCount;
    maxVotes = roomData.data.competition.veto.max_vote;
    timeLimit = roomData.data.competition.timeLimit;
    privateRoom = roomData.data.config.privateRoom;
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

  let moreRoomInfo = (
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
      <Button size='sm' colorScheme='orange' onClick={onOpen}>
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

const mapStateToProps = (state) => ({
  roomData: state.roomData,
});

export default connect(mapStateToProps, null)(RoomInfo);
