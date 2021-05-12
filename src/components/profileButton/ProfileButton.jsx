import React from 'react';
import { useHistory } from 'react-router-dom';
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
} from '@chakra-ui/react';
import Logout from './Logout';

const ProfileButton = ({ profileData }) => {
  const history = useHistory();

  // Extracting relevant profile data
  const { picture, firstName, lastName, userName, email } = profileData;

  return (
    <Popover placement='bottom-end'>
      <PopoverTrigger>
        <Image
          cursor='pointer'
          borderRadius='full'
          boxSize='45px'
          src={picture}
          alt={userName}
        />
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
          <Button
            colorScheme='teal'
            variant='ghost'
            w='100%'
            onClick={() => history.push('/settings')}
          >
            Settings
          </Button>
          <Logout />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileButton;
