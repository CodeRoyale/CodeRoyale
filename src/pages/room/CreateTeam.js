import React, { useState, useRef } from 'react';
import { createTeam } from '../../actions/teamActions';
import { connect } from 'react-redux';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Icon,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';

const CreateTeam = ({ socketData, createTeam }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const [teamName, setTeamName] = useState('');
  const socket = socketData.socket;

  // Create team action
  const handleCreateTeam = () => {
    createTeam(socket, { team_name: teamName });
    setTeamName('');
    onClose();
  };

  return (
    <Flex pos='fixed' bottom='0' right='0' marginRight='1em' marginBottom='1em'>
      <IconButton
        aria-label='Create Team'
        icon={<Icon as={BsPlus} w={6} h={6} />}
        borderRadius='full'
        boxSize='50px'
        colorScheme='codeRoyale'
        onClick={onOpen}
      />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a team</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Team name</FormLabel>
              <Input
                ref={initialRef}
                value={teamName}
                placeholder='Team name'
                onChange={(e) => setTeamName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='codeRoyale' mr={3} onClick={handleCreateTeam}>
              Create Team
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps, { createTeam })(CreateTeam);
