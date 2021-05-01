import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  preCheckUser,
  userNameCheck,
  userActionReset,
} from '../../actions/userActions';
import SettingsBody from './SettingsBody';
import NavBar from '../../components/navBar';
import {
  ERROR,
  DELETED,
  UPDATE,
  AVAILABLE,
  CONFLICT,
} from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import { Flex, useToast, Spinner } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { deleteAccount, updateAccount } from '../../api/userAPI';

const Settings = ({
  userData,
  preCheckUser,
  userNameCheck,
  userActionReset,
}) => {
  const history = useHistory();
  // For showing toast messages
  const toast = useToast();

  const [userNameAvailable, setUserNameAvailable] = useState(null);

  const deleteAccountMutation = useMutation((history) =>
    deleteAccount(history)
  );
  const updateAccountMutation = useMutation((history, newAccountData) =>
    updateAccount(history, newAccountData)
  );

  // For checking if user token is validated by server
  useEffect(() => {
    preCheckUser(history);
  }, [preCheckUser, history]);

  // PreCheck error handling
  useEffect(() => {
    if (
      userData.preCheckData.error &&
      userData.preCheckData.error.payload === undefined
    ) {
      toast({
        title: 'Error on Precheck',
        description: userData.preCheckData.error,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      localStorage.removeItem('token');
      history.push('/login');
      userActionReset();
    }
  }, [userData.preCheckData.error, userActionReset, history, toast]);

  // Delete account error handling
  if (deleteAccountMutation.isError) {
    switch (deleteAccountMutation.error.response.data.payload.message) {
      case ERROR:
        toast({
          title: 'Error on deleting account',
          description: "Couldn't delete your account, please try again later!",
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        userActionReset();
        break;
      default:
        toast({
          title: 'Error on deleting account',
          description: "Couldn't delete your account, please try again later!",
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        userActionReset();
        break;
    }
    deleteAccountMutation.reset();
  }

  // Update account error handling
  if (updateAccountMutation.isError) {
    switch (updateAccountMutation.error.response.payload.message) {
      case ERROR:
        toast({
          title: 'Error on updating account',
          description: "Couldn't update your profile, please try again later!",
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        userActionReset();
        break;
      default:
        toast({
          title: 'Error on updating account',
          description: "Couldn't update your profile, please try again later!",
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        userActionReset();
        break;
    }
  }

  /* 
    - Show user if userName is not available if conflict from server
    - userName checking error handling
  */
  useEffect(() => {
    if (
      userData.userNameCheckData.error &&
      userData.userNameCheckData.error.payload !== undefined
    ) {
      switch (userData.userNameCheckData.error.payload.message) {
        case CONFLICT:
          setUserNameAvailable(false);
          userActionReset();
          break;
        case ERROR:
          toast({
            title: 'Error on username check',
            description: 'Some error occured! Please try again later!',
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
          userActionReset();
          break;
        default:
          toast({
            title: 'Error on username check',
            description: 'Some error occured! Please try again later!',
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
          userActionReset();
          break;
      }
    } else if (userData.userNameCheckData.error) {
      toast({
        title: 'Error on username check',
        description: userData.userNameCheckData.error,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      userActionReset();
    }
  }, [userData.userNameCheckData.error, userActionReset, toast]);

  // Message to user when account deleted
  if (
    deleteAccountMutation.isSuccess &&
    deleteAccountMutation.data.payload.message === DELETED
  ) {
    toast({
      title: 'Account deleted successfully!',
      description:
        'Your account has been deleted permanently. Sorry to see you go!',
      status: 'success',
      position: 'top-right',
      duration: 4000,
      isClosable: true,
    });
    localStorage.removeItem('token');
    history.push('/');
    deleteAccountMutation.reset();
  }

  // Message to user when account is updated
  if (
    updateAccountMutation.isSuccess &&
    updateAccountMutation.data.payload.message === UPDATE
  ) {
    localStorage.token = updateAccountMutation.data.payload.accessToken;
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated with new information',
      status: 'success',
      position: 'top-right',
      duration: 4000,
      isClosable: true,
    });
    updateAccountMutation.reset();
  }

  // If userName is available
  useEffect(() => {
    if (userData.userNameCheckData.data) {
      if (userData.userNameCheckData.data.payload.message === AVAILABLE) {
        setUserNameAvailable(true);
      }
    }
  }, [userData.userNameCheckData.data, userActionReset]);

  const handleDeleteAccount = () => {
    deleteAccountMutation.mutate(history);
  };

  const handleUpdateAccount = (data) => {
    updateAccountMutation.mutate(history, data);
  };

  // UI if user is valid and properly authenticated
  let content = (
    <Flex flexDir='column' height='100vh'>
      <NavBar loggedIn={true} />
      <SettingsBody
        sendDeleteAccountLoading={deleteAccountMutation.isLoading}
        sendUpdateAccountLoading={updateAccountMutation.isLoading}
        sendUserNameAvailable={userNameAvailable}
        getDeleteAccount={handleDeleteAccount}
        getUpdateAccountData={handleUpdateAccount}
        getUserNameCheckData={(data) => userNameCheck(history, data)}
      />
    </Flex>
  );

  // Pre-check running
  if (userData.preCheckData.isLoading) {
    content = (
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

  return content;
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, {
  preCheckUser,
  userNameCheck,
  userActionReset,
})(Settings);
