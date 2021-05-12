import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import login from '../../assets/login.svg';

const LoginLeftSection = () => (
  <Flex
    bg='#edb3a4'
    w='50%'
    h='100vh'
    justifyContent='center'
    alignItems='center'
  >
    <Image src={login} alt='Login' boxSize='400px' />
  </Flex>
);

export default LoginLeftSection;
