import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser, userActionReset } from '../../actions/userActions';
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

const LoginMain = ({ userData, loginUser, userActionReset }) => {
  const history = useHistory();

  // For displaying toast messages based on login events
  const toast = useToast();

  const handleAuthData = (data) => {
    loginUser(data);
  };

  // Login error handling
  useEffect(() => {
    if (
      userData.loginData.error &&
      userData.loginData.error.payload !== undefined
    ) {
      switch (userData.loginData.error.payload.message) {
        case REGISTER:
          toast({
            title: 'Error on Login',
            description: 'You will have to Sign Up first to use CodeRoyale!',
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
          userActionReset();
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
          userActionReset();
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
          userActionReset();
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
          userActionReset();
          break;
      }
    } else if (userData.loginData.error) {
      toast({
        title: 'Error on Login',
        description: userData.loginData.error,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      userActionReset();
    }
  }, [toast, userData.loginData.error, userActionReset]);

  // Checking if user logged in successfully
  useEffect(() => {
    if (userData.loginData.data) {
      if (userData.loginData.data.payload.message === LOGIN) {
        history.push('/dashboard');
      }
    }
  }, [userData.loginData.data, history]);

  // Default content
  let content = (
    <Flex>
      <LoginLeftSection />
      <LoginRightSection
        isLoading={userData.loginData.isLoading}
        getAuthData={handleAuthData}
      />
    </Flex>
  );

  return content;
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, { loginUser, userActionReset })(
  LoginMain
);
