import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signUpUser, userActionReset } from '../../actions/userActions';
import { useHistory } from 'react-router-dom';
import {
  CONFLICT,
  CREATED,
  MISSING,
  ERROR,
  ERRORTOKEN,
} from '../../utils/constants';
import { Flex, useToast } from '@chakra-ui/react';
import SignUpLeftSection from './SignUpLeftSection';
import SignUpRightSection from './SignUpRightSection';

const SignUp = ({ userData, signUpUser, userActionReset }) => {
  const history = useHistory();

  // For displaying toast messages based on login events
  const toast = useToast();

  const handleAuthData = (data) => {
    signUpUser(data);
  };

  useEffect(() => {
    if (
      userData.signUpData.error &&
      userData.signUpData.error.payload !== undefined
    ) {
      switch (userData.signUpData.error.payload.message) {
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
          userActionReset();
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
          userActionReset();
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
          userActionReset();
          break;
      }
    } else if (userData.signUpData.error) {
      toast({
        title: 'Error on Sign up',
        description: userData.signUpData.error,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      userActionReset();
    }
  }, [userData.signUpData.error, userActionReset, history, toast]);

  // Check if user registered successfully
  useEffect(() => {
    if (userData.signUpData.data) {
      if (userData.signUpData.data.payload.message === CREATED) {
        toast({
          title: 'Registered successfully!',
          description: 'Welcome to CodeRoyale! Login to compete',
          status: 'success',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        userActionReset();
        history.push('/login');
      }
    }
  }, [userData.signUpData.data, history, userActionReset, toast]);

  // Default content
  let content = (
    <Flex>
      <SignUpLeftSection />
      <SignUpRightSection
        isLoading={userData.signUpData.isLoading}
        getAuthData={handleAuthData}
      />
    </Flex>
  );

  return content;
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, { signUpUser, userActionReset })(
  SignUp
);
