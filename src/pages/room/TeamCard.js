import React from 'react';
import {
  Flex,
  Text,
  Image,
  Icon,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import CountBar from './CountBar';
import profileData from '../../utils/profileData';
import { joinTeam, leaveTeam } from '../../service/teamSocket';
import useSocket from '../../global-stores/useSocket';
import useRoom from '../../global-stores/useRoom';

const TeamCard = ({ teamName, totalUsers, users }) => {
  const socket = useSocket((state) => state.socket);
  const room = useRoom((state) => state.room);
  const updateRoomTeams = useRoom((state) => state.updateRoomTeams);
  const toast = useToast();

  const userName = profileData().userName.toString();
  const userCount = users.length;
  let buttonIcon = (
    <Icon as={AiOutlinePlus} w={4} h={4} customtype='joinTeam' />
  );

  // // Checking if user is in the team or not...
  if (users.includes(userName)) {
    buttonIcon = (
      <Icon as={AiOutlineMinus} w={4} h={4} customtype='leaveTeam' />
    );
  }

  const handleJoinOrLeaveTeam = () => {
    if (buttonIcon.props.customtype === 'joinTeam') {
      joinTeam(socket, { team_name: teamName }, (error, data) => {
        if (data) {
          updateRoomTeams(data);
          toast({
            title: 'You joined a team',
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
    } else if (buttonIcon.props.customtype === 'leaveTeam') {
      leaveTeam(socket, (error, data) => {
        if (data) {
          updateRoomTeams(data);
          toast({
            title: 'You left a team',
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
    }
  };

  // UserCard...
  const userCards = users.map((user, index) => (
    <Flex
      key={index}
      bgColor='rgba(221, 50, 20, 0.1)'
      marginY='0.5em'
      padding='0.5em'
      alignItems='center'
    >
      <Image
        borderRadius='full'
        boxSize='40px'
        src={room ? room.state.profilePictures[user] : null}
        alt='Profile Pic'
      />
      <Text fontSize='sm' fontWeight='bold' color='#dd2c00' marginLeft='1em'>
        {user}
      </Text>
    </Flex>
  ));

  return (
    <Flex
      width='230px'
      bgColor='white'
      flexDir='column'
      padding='1em'
      margin='1em'
      boxShadow='0 0 1px 1px rgba(0, 0, 0, 0.2)'
    >
      <Text textAlign='center' fontSize='lg' fontWeight='bold'>
        {teamName}
      </Text>
      <CountBar count={userCount} total={totalUsers} />
      {userCards}
      <IconButton
        size='xs'
        marginTop='0.4em'
        aria-label='Join or leave team'
        icon={buttonIcon}
        colorScheme='codeRoyale'
        onClick={handleJoinOrLeaveTeam}
      />
    </Flex>
  );
};

export default TeamCard;
