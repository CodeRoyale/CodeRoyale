import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import {
  CONFLICT,
  CREATED,
  MISSING,
  ERROR,
  ERRORTOKEN,
  SERVER_DOWN,
} from '../../utils/constants';
import SignUpLeftSection from './SignUpLeftSection';
import SignUpRightSection from './SignUpRightSection';
import { signUpUser } from '../../api/userAPI';

const SignUp = () => {
  const history = useHistory();

  // For displaying toast messages based on login events
  const toast = useToast();

  // Making the login api call using mutation
  const signUpMutation = useMutation((signUpData) => signUpUser(signUpData));
  const { data, error, isError, isLoading, isSuccess } = signUpMutation;

  // authData received in props
  const handleAuthData = (authData) => {
    signUpMutation.mutate(authData);
  };

  // SignUp success handling
  if (isSuccess && data.payload.message === CREATED) {
    toast({
      title: 'Registered successfully!',
      description: 'Welcome to CodeRoyale! Login to compete',
      status: 'success',
      position: 'top-right',
      duration: 4000,
      isClosable: true,
    });
    signUpMutation.reset();
    history.push('/login');
  }

  // SignUp error handling
  if (isError) {
    if (error.response) {
      switch (error.response.data.payload.message) {
        case CONFLICT:
          toast({
            title: 'Error on Sign up',
            description: 'You have already registered! Login to use CodeRoyale',
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
          history.push('/login');
          break;
        case MISSING:
        case ERROR:
        case ERRORTOKEN:
          toast({
            title: 'Error on Sign up',
            description: 'Some error occurred, please try again later',
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
          break;
        default:
          toast({
            title: 'Error on Sign up',
            description: 'Some error occurred, please try again later',
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
          break;
      }
    } else {
      toast({
        title: 'Error on Sign up',
        description: SERVER_DOWN,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    }
    signUpMutation.reset();
  }

  return (
    <Flex>
      <SignUpLeftSection />
      <SignUpRightSection isLoading={isLoading} getAuthData={handleAuthData} />
    </Flex>
  );
};

export default SignUp;
