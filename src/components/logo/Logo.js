import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import './Logo.scss';

const Logo = () => {
  const history = useHistory();

  return (
    <Box>
      <Text
        fontSize='2xl'
        cursor='pointer'
        onClick={() => history.push('/')}
        fontFamily='Kaushan Script, cursive'
      >
        CodeRoyale
      </Text>
    </Box>
  );
};

export default Logo;
