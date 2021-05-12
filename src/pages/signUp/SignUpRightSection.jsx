import React, { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  Stack,
  Text,
  Spinner,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import GoogleAuth from '../../components/googleAuth';
import FacebookAuth from '../../components/facebookAuth';

const SignUpRightSection = ({ isLoading, getAuthData }) => {
  const history = useHistory();

  // For password input
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [sendSignUpRequest, setSendSignUpRequest] = useState(false);
  const [signUpData, setSignUpData] = useState({});
  const [password, setPassword] = useState('');

  // Send back successful auth data to SignUpMain
  const handleAuthData = (authData) => {
    setSignUpData(authData);
    setShowPasswordPrompt(true);
  };

  // Function called after user enters password
  // Then client ready to send request for signup with password
  const handleSignupClick = () => {
    setSignUpData((prevState) => ({
      ...prevState,
      password: password,
    }));
    setSendSignUpRequest(true);
  };

  useEffect(() => {
    if (sendSignUpRequest) {
      getAuthData(signUpData);
      setSendSignUpRequest(false);
      setShowPasswordPrompt(false);
    }
  }, [showPasswordPrompt, sendSignUpRequest, signUpData, getAuthData]);

  // Request user to input password for sign up
  if (showPasswordPrompt) {
    return (
      <Flex
        bg='white'
        w='50%'
        h='100vh'
        justifyContent='center'
        alignItems='center'
      >
        <Stack align='center'>
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button onClick={handleSignupClick} colorScheme='codeRoyale'>
            Sign up
          </Button>
        </Stack>
      </Flex>
    );
  }

  // Loading indicator once request sent to server for signup
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
          <Text fontSize='md'>Signing you up!</Text>
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
            Signup
          </Text>
          <Text
            fontSize='3xl'
            fontWeight='bold'
            fontFamily='Kaushan Script, cursive'
          >
            CodeRoyale
          </Text>
        </Flex>
        <GoogleAuth text='Sign up with Google' getAuthData={handleAuthData} />
        <FacebookAuth
          text='Sign up with Facebook'
          getAuthData={handleAuthData}
        />
        <Text fontSize='sm'>
          Already a member?{' '}
          <Button
            fontSize='sm'
            marginRight='0.8em'
            variant='link'
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Button>
        </Text>
      </Stack>
    </Flex>
  );
};

export default SignUpRightSection;
