import React, { useMemo } from 'react';
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
import useRoom from '../../global-stores/useRoom';
import useVetoedUsers from '../../global-stores/useVetoedUsers';

const VetoStatus = () => {
  const room = useRoom((state) => state.room);
  const vetoedUsers = useVetoedUsers((state) => state.vetoedUsers);

  // Extracting all teams in room
  let roomTeams;
  if (room) {
    roomTeams = room.teams;
  }

  // No need to calculate everything component renders since roomTeams does not change
  const vetoUsers = useMemo(() => getAllVetoUsers(roomTeams), [roomTeams]);

  let statusCards = null;

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Displaying all users in the room for veto status
  if (vetoUsers && vetoedUsers) {
    statusCards = vetoUsers.map((item, index) => (
      <VetoStatusCard
        key={index}
        userName={item.userName}
        userImage={room.state.profilePictures[item.userName]}
        team={item.team}
        userVetoed={vetoedUsers.includes(item.userName)}
      />
    ));
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

// Get all users in room
const getAllVetoUsers = (teams) => {
  const vetoUsers = [];
  for (const team in teams) {
    // Gives the array of players in a team
    const teamPlayers = teams[team];
    for (let i = 0; i < teamPlayers.length; i++) {
      vetoUsers.push({
        userName: teamPlayers[i],
        team,
      });
    }
  }
  return vetoUsers;
};

export default VetoStatus;
