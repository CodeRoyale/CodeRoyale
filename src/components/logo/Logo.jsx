import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text, Image } from '@chakra-ui/react';
import CodeRoyale from '../../assets/CodeRoyale.png';

const Logo = () => {
  const history = useHistory();

  return (
    <Box
      display='flex'
      alignItems='center'
      onClick={() => history.push('/')}
      cursor='pointer'
    >
      <Image src={CodeRoyale} alt='Logo CR' w='52px' h={6} />
      <Text
        marginLeft='0.3em'
        fontWeight='bold'
        fontSize='xl'
        fontFamily='Roboto, sans-serif'
      >
        Code<span style={{ color: '#dd2c00' }}>Royale</span>
      </Text>
    </Box>
  );
};

export default Logo;
