import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Icon,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import useSocket from '../../global-stores/useSocket';
import useRoom from '../../global-stores/useRoom';
import { closeRoom } from '../../service/roomSocket';

const CloseRoom = () => {
  const socket = useSocket((state) => state.socket);
  const setRoom = useRoom((state) => state.setRoom);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const history = useHistory();

  const handleCloseRoom = () => {
    closeRoom(socket, (error, data) => {
      if (data) {
        toast({
          title: 'Room closed',
          description: error,
          status: 'success',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        setRoom(null);
        history.push('/dashboard');
      }

      if (error) {
        toast({
          title: 'Error on Close Room',
          description: error,
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <>
      <Button
        leftIcon={<Icon as={IoClose} />}
        onClick={onOpen}
        colorScheme='red'
        size='sm'
      >
        Close Room
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Close Room?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to close the room? You can`&apos;`t undo this
            action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' ml={3} onClick={handleCloseRoom}>
              Close Room
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CloseRoom;
