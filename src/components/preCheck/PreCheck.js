import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';
import usePreCheck from '../../hooks/usePreCheck';

const PreCheck = ({ route, children }) => {
  const history = useHistory();
  const { data, isLoading, isSuccess, isError } = usePreCheck(history);

  // Call to API is loading
  if (isLoading) {
    return (
      <Flex
        height='100vh'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
      >
        <Spinner color='#dd2c00' />
      </Flex>
    );
  }

  // API return an error
  if (isError) {
    localStorage.removeItem('token');
    return <Redirect to='/login' />;
  }

  // Precheck of token was successfully
  if (isSuccess) {
    localStorage.token = data.payload.accessToken;
  }

  return (
    <Route exact path={route.path}>
      {children}
    </Route>
  );
};

export default PreCheck;
