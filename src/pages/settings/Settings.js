import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import SettingsBody from './SettingsBody';
import NavBar from '../../components/navBar';
import { ERROR, DELETED, UPDATE, SERVER_DOWN } from '../../utils/constants';
import { deleteAccount, updateAccount } from '../../api/userAPI';

const Settings = () => {
  const history = useHistory();
  // For showing toast messages
  const toast = useToast();

  // const [userNameAvailable, setUserNameAvailable] = useState(null);

  const deleteAccountMutation = useMutation((history) =>
    deleteAccount(history)
  );
  const updateAccountMutation = useMutation((history, newAccountData) =>
    updateAccount(history, newAccountData)
  );

  // Delete account error handling
  if (deleteAccountMutation.isError) {
    if (deleteAccountMutation.error.response) {
      switch (deleteAccountMutation.error.response.data.payload.message) {
        case ERROR:
          toast({
            title: 'Error on deleting account',
            description:
              "Couldn't delete your account, please try again later!",
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
          break;
        default:
          toast({
            title: 'Error on deleting account',
            description:
              "Couldn't delete your account, please try again later!",
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
          break;
      }
    } else {
      toast({
        title: 'Error on deleting account',
        description: SERVER_DOWN,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    }
    deleteAccountMutation.reset();
  }

  // Update account error handling
  if (updateAccountMutation.isError) {
    if (updateAccountMutation.error.response) {
      switch (updateAccountMutation.error.response.payload.message) {
        case ERROR:
          toast({
            title: 'Error on updating account',
            description:
              "Couldn't update your profile, please try again later!",
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
          break;
        default:
          toast({
            title: 'Error on updating account',
            description:
              "Couldn't update your profile, please try again later!",
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
          break;
      }
    } else {
      toast({
        title: 'Error on updating account',
        description: SERVER_DOWN,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    }
    updateAccountMutation.reset();
  }

  /* 
    - Show user if userName is not available if conflict from server
    - userName checking error handling
  */
  // useEffect(() => {
  //   if (
  //     userData.userNameCheckData.error &&
  //     userData.userNameCheckData.error.payload !== undefined
  //   ) {
  //     switch (userData.userNameCheckData.error.payload.message) {
  //       case CONFLICT:
  //         setUserNameAvailable(false);
  //         userActionReset();
  //         break;
  //       case ERROR:
  //         toast({
  //           title: 'Error on username check',
  //           description: 'Some error occured! Please try again later!',
  //           status: 'error',
  //           position: 'top-right',
  //           duration: 4000,
  //           isClosable: true,
  //         });
  //         userActionReset();
  //         break;
  //       default:
  //         toast({
  //           title: 'Error on username check',
  //           description: 'Some error occured! Please try again later!',
  //           status: 'error',
  //           position: 'top-right',
  //           duration: 4000,
  //           isClosable: true,
  //         });
  //         userActionReset();
  //         break;
  //     }
  //   } else if (userData.userNameCheckData.error) {
  //     toast({
  //       title: 'Error on username check',
  //       description: userData.userNameCheckData.error,
  //       status: 'error',
  //       position: 'top-right',
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //     userActionReset();
  //   }
  // }, [userData.userNameCheckData.error, userActionReset, toast]);

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
  // useEffect(() => {
  //   if (userData.userNameCheckData.data) {
  //     if (userData.userNameCheckData.data.payload.message === AVAILABLE) {
  //       setUserNameAvailable(true);
  //     }
  //   }
  // }, [userData.userNameCheckData.data, userActionReset]);

  const handleDeleteAccount = () => {
    deleteAccountMutation.mutate(history);
  };

  const handleUpdateAccount = (data) => {
    updateAccountMutation.mutate(history, data);
  };

  return (
    <Flex flexDir='column' height='100vh'>
      <NavBar loggedIn />
      <SettingsBody
        sendDeleteAccountLoading={deleteAccountMutation.isLoading}
        sendUpdateAccountLoading={updateAccountMutation.isLoading}
        getDeleteAccount={handleDeleteAccount}
        getUpdateAccountData={handleUpdateAccount}
        // getUserNameCheckData={(data) => userNameCheck(history, data)}
      />
    </Flex>
  );
};

export default Settings;
