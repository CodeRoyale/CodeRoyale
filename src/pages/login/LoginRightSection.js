import React from 'react';
import { Flex, Button, Stack, Text, Spinner } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
import FacebookAuth from '../../components/facebookAuth/FacebookAuth';

const LoginRightSection = ({ isLoading, getAuthData }) => {
  const history = useHistory();

  // Send back successful auth data in props
  const handleAuthData = (data) => {
    getAuthData(data);
  };

  // Loading indicator once request sent to server for login
  if (isLoading) {
    return (
      <Flex
        bg='white'
        w='50%'
        h='100vh'
        justifyContent='center'
        alignItems='center'
      >
        <Stack align='center'>
          <Spinner color='#dd2c00' />
          <Text fontSize='md'>Logging you in!</Text>
        </Stack>
      </Flex>
    );
  }

  return (
    <Flex
      bg='white'
      w='50%'
      h='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <Stack align='center'>
        <Flex alignItems='center' flexDir='column'>
          <Text fontSize='2xl' fontWeight='bold'>
            Login
          </Text>
          <Text
            fontSize='3xl'
            fontWeight='bold'
            fontFamily='Kaushan Script, cursive'
          >
            CodeRoyale
          </Text>
        </Flex>
        <GoogleAuth text='Login with Google' getAuthData={handleAuthData} />
        <FacebookAuth text='Login with Facebook' getAuthData={handleAuthData} />
        <Text fontSize='sm'>
          Not a member?{' '}
          <Button
            fontSize='sm'
            marginRight='0.8em'
            variant='link'
            onClick={() => {
              history.push('/signup');
            }}
          >
            Sign up now!
          </Button>
        </Text>
      </Stack>
    </Flex>
  );
};

export default LoginRightSection;
