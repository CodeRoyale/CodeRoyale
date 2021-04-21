import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { ROOM_CLOSED } from '../../utils/constants';
import { closeRoom } from '../../actions/roomActions';
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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

const CloseRoom = ({ roomData, socketData, closeRoom }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const socket = socketData.socket;
  const history = useHistory();
  const [closeRoomActionDone, setCloseRoomActionDone] = useState(false);

  useEffect(() => {
    if (closeRoomActionDone && roomData.type === ROOM_CLOSED) {
      history.push('/dashboard');
      setCloseRoomActionDone(false);
    } else if (closeRoomActionDone && roomData.error && !roomData.loading) {
      toast({
        title: 'Error on Close Room',
        description: roomData.error,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      setCloseRoomActionDone(false);
    }
  }, [
    history,
    toast,
    closeRoomActionDone,
    roomData.error,
    roomData.loading,
    roomData.type,
  ]);

  const handleCloseRoom = () => {
    closeRoom(socket);
    setCloseRoomActionDone(true);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme='red' size='sm'>
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
            Are you sure you want to close the room? You can't undo this action
            afterwards.
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

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { closeRoom })(CloseRoom);
