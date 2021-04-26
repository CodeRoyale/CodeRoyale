import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  LOGIN,
  REGISTER,
  AUTHERROR,
  ERROR,
  INVALID,
} from '../../utils/constants';
import { Flex, useToast } from '@chakra-ui/react';
import LoginLeftSection from './LoginLeftSection';
import LoginRightSection from './LoginRightSection';
import { useMutation } from 'react-query';
import { loginUser } from '../../api/userAPI';

const Login = () => {
  const history = useHistory();

  // For displaying toast messages based on login events
  const toast = useToast();

  // Making the login api call using mutation
  const loginMutation = useMutation((loginData) => loginUser(loginData));
  const { data, error, isError, isLoading, isSuccess } = loginMutation;

  // authData received in props
  const handleAuthData = (data) => {
    loginMutation.mutate({
      issuer: data.issuer,
      access_token: data.access_token,
    });
  };

  // Login error handing
  if (isError) {
    switch (error.response.data.payload.message) {
      case REGISTER:
        toast({
          title: 'Error on Login',
          description: 'You will have to Sign Up first to use CodeRoyale!',
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        break;
      case ERROR:
        toast({
          title: 'Error on Login',
          description: 'Some error occurred, we are working to fix it.',
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        break;
      case AUTHERROR:
      case INVALID:
        toast({
          title: 'Error on Login',
          description: 'Some error occurred, please try again later.',
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        break;
      default:
        toast({
          title: 'Error on Login',
          description: 'Some error occurred, please try again later.',
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        break;
    }
    loginMutation.reset();
  }

  // Login success handling
  if (isSuccess && data.payload.message === LOGIN) {
    localStorage.token = data.payload.accessToken;
    history.push('/dashboard');
  }

  return (
    <Flex>
      <LoginLeftSection />
      <LoginRightSection isLoading={isLoading} getAuthData={handleAuthData} />
    </Flex>
  );
};

export default Login;
