import React from 'react';
import CountBar from './CountBar';
import profileData from '../../utils/profileData';
import { joinTeam, leaveTeam } from '../../actions/teamActions';
import { connect } from 'react-redux';
import { Flex, Text, Image, Icon, IconButton } from '@chakra-ui/react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const TeamCard = ({
  team_name,
  totalUsers,
  users,
  socketData,
  roomData,
  joinTeam,
  leaveTeam,
}) => {
  const userName = profileData().userName.toString();
  const socket = socketData.socket;
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
      joinTeam(socket, { team_name });
    } else if (buttonIcon.props.customtype === 'leaveTeam') {
      leaveTeam(socket);
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
        src={roomData.data.state.profilePictures[user]}
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
        {team_name}
      </Text>
      <CountBar count={userCount} total={totalUsers} />
      {userCards}
      <IconButton
        size='xs'
        marginTop='0.4em'
        aria-label='Join or leave team'
        icon={buttonIcon}
        colorScheme='orange'
        onClick={handleJoinOrLeaveTeam}
      />
    </Flex>
  );
};

export const mapStateToProps = (state) => ({
  socketData: state.socketData,
  roomData: state.roomData,
  teamData: state.teamData,
});

export default connect(mapStateToProps, { joinTeam, leaveTeam })(TeamCard);
