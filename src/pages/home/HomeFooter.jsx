import React from 'react';
import { Box, Button, Icon } from '@chakra-ui/react';
import { AiFillGithub } from 'react-icons/ai';

const HomeFooter = () => (
  <Box display='flex' alignItems='center' justifyContent='center' padding='1em'>
    <Button
      leftIcon={<Icon as={AiFillGithub} />}
      onClick={(e) => {
        e.preventDefault();
        window.open('https://github.com/CodeRoyale', '_blank');
      }}
    >
      Github
    </Button>
  </Box>
);

export default HomeFooter;
