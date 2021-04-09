import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import './LogoContainer.scss';

const LogoContainer = () => {
  const history = useHistory();

  return (
    <Box>
      <Text
        fontSize='2xl'
        onClick={() => history.push('/')}
        fontFamily='Kaushan Script, cursive'
      >
        CodeRoyale
      </Text>
    </Box>
  );
};

export default LogoContainer;
