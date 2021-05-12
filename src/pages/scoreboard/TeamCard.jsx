import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import PlayerCard from './PlayerCard';
import goldMedal from '../../assets/gold-medal.svg';
import silverMedal from '../../assets/silver-medal.svg';
import bronzeMedal from '../../assets/bronze-medal.svg';

const TeamCard = ({ rank, teamName, team, userImages }) => {
  let medalStyle;

  let playerCards = null;

  // Styling based on rank
  if (rank === 'gold') {
    medalStyle = {
      style: {
        bgColor: '#FFBA57',
      },
      medal: goldMedal,
    };
  } else if (rank === 'silver') {
    medalStyle = {
      style: {
        bgColor: '#9D9D9D',
        margin: '70px 25px 0px 0px',
      },
      medal: silverMedal,
    };
  } else if (rank === 'bronze') {
    medalStyle = {
      style: {
        bgColor: '#CD7430',
        margin: '100px 0px 0px 25px',
      },
      medal: bronzeMedal,
    };
  }

  if (team !== undefined) {
    playerCards = team.map((player) => (
      <PlayerCard
        key={uuidv4()}
        userImage={userImages[player]}
        userName={player}
      />
    ));
  }

  return (
    <Flex
      as='div'
      width='23%'
      height='500px'
      flexDir='column'
      alignItems='center'
      padding='0.5em'
      margin={medalStyle.style.margin}
      bgColor={medalStyle.style.bgColor}
    >
      <Image
        pos='relative'
        top='-60px'
        src={medalStyle.medal}
        boxSize='100px'
      />
      <Text pos='relative' top='-55px' fontSize='2xl' fontWeight='bold'>
        {teamName}
      </Text>
      {playerCards}
    </Flex>
  );
};

export default TeamCard;
