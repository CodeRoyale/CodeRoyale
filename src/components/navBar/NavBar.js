import React from 'react';
import { useHistory } from 'react-router-dom';
import LogoContainer from '../../components/logoContainer/LogoContainer';
import ProfileButton from '../../components/profileButton/ProfileButton';
import profileData from '../../utils/profileData';
import { Flex, Button, Spacer } from '@chakra-ui/react';

const NavBar = ({ loggedIn }) => {
  const history = useHistory();

  // Default navBar (loggedIn)
  let content = (
    <Flex
      as='nav'
      position='fixed'
      width='100%'
      alignItems='center'
      padding='1em'
      bgColor='white'
      zIndex='10'
      boxShadow='0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(250, 250, 242)'
    >
      <LogoContainer />
      <Spacer />
      <ProfileButton profileData={profileData()} />
    </Flex>
  );

  // If user is not loggedIn
  if (!loggedIn) {
    content = (
      <Flex
        as='nav'
        position='fixed'
        width='100%'
        alignItems='center'
        padding='1em'
        bgColor='white'
        zIndex='10'
        boxShadow='0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(250, 250, 242)'
      >
        <LogoContainer />
        <Spacer />
        <Flex alignItems='center'>
          <Button
            marginRight='0.8em'
            variant='link'
            onClick={() => {
              history.push('/signup');
            }}
          >
            Sign up
          </Button>
          <Button paddingX='1.3em' onClick={() => history.push('/login')}>
            Login
          </Button>
        </Flex>
      </Flex>
    );
  }

  return content;
};

export default NavBar;
