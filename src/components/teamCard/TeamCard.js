import React, { useState, useEffect } from 'react';
import './TeamCard.css';
import CountBar from '../../pages/roomPage/CountBar';
import profileData from '../../utils/profileData';
import { joinTeam, leaveTeam } from '../../actions/teamActions';
import { connect } from 'react-redux';
import { Flex, Text, Image, Icon, IconButton } from '@chakra-ui/react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function TeamCard({
  team_name,
  totalUsers,
  users,
  socketData,
  roomData,
  joinTeam,
  leaveTeam,
}) {
  // const [teamButtonClicked, setTeamButtonClicked] = useState(false);
  const userName = profileData().userName.toString();
  // const socket = socketData.socket;
  // const userCount = users.length;
  // let buttonText = '+';
  let buttonIcon = <Icon as={AiOutlinePlus} w={5} h={5} />;

  // // Checking if user is in the team or not...
  if (users.includes(userName)) {
    buttonIcon = <Icon as={AiOutlineMinus} w={5} h={5} />;
  }

  //Join or leave team...
  // useEffect(() => {
  //   if (teamButtonClicked) {
  //     if (buttonText === '+') {
  //       joinTeam(socket, { team_name });
  //     } else if (buttonText === '-') {
  //       leaveTeam(socket);
  //     }
  //     setTeamButtonClicked(false);
  //   }
  // }, [teamButtonClicked, buttonText, joinTeam, leaveTeam, socket, team_name]);

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
    <Flex flexDir='column' border='2px red dotted' padding='1em'>
      <Text textAlign='center' fontSize='lg' fontWeight='bold'>
        Joel
      </Text>
      <CountBar count={1} total={2} />
      {userCards}
      <IconButton
        size='sm'
        aria-label='Join or leave team'
        icon={buttonIcon}
        colorScheme='orange'
      />
    </Flex>
  );
}

export const mapStateToProps = (state) => {
  return {
    socketData: state.socketData,
    roomData: state.roomData,
    teamData: state.teamData,
  };
};

export default connect(mapStateToProps, { joinTeam, leaveTeam })(TeamCard);
