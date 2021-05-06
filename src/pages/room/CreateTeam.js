import React, { useState, useRef } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';
import useSocket from '../../global-stores/useSocket';
import useTeamEvent from '../../global-stores/useTeamEvent';
import { createTeam } from '../../service/teamSocket';

const CreateTeam = () => {
  const socket = useSocket((state) => state.socket);
  const setTeamEvent = useTeamEvent((state) => state.setTeamEvent);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  const [teamName, setTeamName] = useState('');

  const handleCreateTeam = () => {
    createTeam(socket, { team_name: teamName }, (error, data) => {
      if (data) {
        setTeamEvent('TEAM_CREATED');
        toast({
          title: 'You have created a new team',
          status: 'success',
          position: 'top-right',
          duration: 750,
          isClosable: true,
        });
      }

      if (error) {
        toast({
          title: error,
          status: 'error',
          position: 'top-right',
          duration: 750,
          isClosable: true,
        });
      }
    });
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

export default CreateTeam;
