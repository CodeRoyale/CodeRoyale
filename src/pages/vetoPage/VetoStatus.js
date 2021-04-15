import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import VetoStatusCard from './VetoStatusCard';

const VetoStatus = ({ vetoUsers, vetoCompletedUsers, userProfilePictures }) => {
  let statusCards = null;

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Displaying all users in the room for veto status
  if (vetoUsers !== undefined && vetoCompletedUsers !== undefined) {
    statusCards = vetoUsers.map((item, index) => {
      return (
        <VetoStatusCard
          key={index}
          userName={item.userName}
          userImage={userProfilePictures[item.userName]}
          team={item.team}
          userVoted={vetoCompletedUsers.includes(item.userName)}
        />
      );
    });
  }

  return (
    <>
      <Button size='sm' onClick={onOpen}>
        Veto Status
      </Button>

      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>Veto Status</DrawerHeader>
            <DrawerBody>{statusCards}</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default VetoStatus;
