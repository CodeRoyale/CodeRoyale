import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { logoutUser } from '../../api/userAPI';
import { LOGOUT, ERROR } from '../../utils/constants';

const Logout = () => {
  const history = useHistory();
  // For showing toast messages
  const toast = useToast();

  const { data, error, isLoading, isSuccess, isError, refetch } = useQuery(
    'logout',
    () => logoutUser(history),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const handleLogout = () => {
    refetch();
  };

  // Logout user error handling
  if (isError) {
    switch (error.response.data.payload.message) {
      case ERROR:
        toast({
          title: 'Error on Logout',
          description: "Couldn't logout, please try again later!",
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: false,
        });
        break;
      default:
        toast({
          title: 'Error on Logout',
          description: "Couldn't logout, please try again later!",
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: false,
        });
        break;
    }
  }

  // When logout successfully
  if (isSuccess && data.payload.message === LOGOUT) {
    localStorage.removeItem('token');
    history.push('/');
  }

  return (
    <Button
      colorScheme='red'
      variant='ghost'
      w='100%'
      isLoading={isLoading}
      loadingText='Logging out...'
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
