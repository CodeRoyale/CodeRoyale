import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import signUp from '../../assets/signUp.svg';

const SignUpLeftSection = () => {
  return (
    <Flex
      bg='#edb3a4'
      w='50%'
      h='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <Image src={signUp} alt='SignUp' boxSize='400px' />
    </Flex>
  );
};

export default SignUpLeftSection;
