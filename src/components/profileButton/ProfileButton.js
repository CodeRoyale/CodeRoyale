import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser, userActionReset } from '../../actions/userActions';
import { LOGOUT, ERROR } from '../../utils/constants';
import {
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Button,
  Text,
  Flex,
  useToast,
} from '@chakra-ui/react';

const ProfileButton = ({
  userActionReset,
  userData,
  profileData,
  logoutUser,
}) => {
  const history = useHistory();

  // For showing toast messages
  const toast = useToast();

  // Extracting relevant profile data
  const { picture, firstName, lastName, userName, email } = profileData;

  const handleLogout = () => {
    logoutUser(history);
  };

  // Logout user error handling
  useEffect(() => {
    if (
      userData.logoutData.error &&
      userData.logoutData.error.payload !== undefined
    ) {
      switch (userData.logoutData.error) {
        case ERROR:
          toast({
            title: 'Error on Logout',
            description: "Couldn't logout, please try again later!",
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: false,
          });
          userActionReset();
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
          userActionReset();
          break;
      }
    } else if (userData.logoutData.error) {
      toast({
        title: 'Error on Logout',
        description: userData.logoutData.error,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: false,
      });
      userActionReset();
    }
  }, [userData.logoutData.error, userActionReset, toast]);

  // Message to user when logout successfull
  useEffect(() => {
    if (userData.logoutData.data) {
      if (userData.logoutData.data.payload.message === LOGOUT) {
        userActionReset();
        localStorage.removeItem('token');
        history.push('/');
      }
    }
  }, [userData.logoutData.data, userActionReset, history]);

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          cursor='pointer'
          borderRadius='full'
          boxSize='45px'
          src={picture}
          alt={userName}
        ></Image>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader fontWeight='semibold' fontSize='lg'>
          {firstName} {lastName}
          <Text fontSize='sm'>{email}</Text>
        </PopoverHeader>
        <PopoverBody>
          <Flex>
            <Text>Logged in as {userName}</Text>
          </Flex>
          <Button colorScheme='teal' variant='ghost' w='100%'>
            Settings
          </Button>
          <Button
            colorScheme='red'
            variant='ghost'
            w='100%'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, {
  logoutUser,
  userActionReset,
})(ProfileButton);
