import React, { useState } from 'react';
import {
  Flex,
  Stack,
  Text,
  Button,
  Image,
  Spinner,
  Icon,
} from '@chakra-ui/react';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import SettingsField from './SettingsField';
import profileData from '../../utils/profileData';
import settings from '../../assets/settings.svg';

const SettingsBody = ({
  getDeleteAccount,
  getUpdateAccountData,
  getUserNameCheckData,
  sendUserNameAvailable,
  sendDeleteAccountLoading,
  sendUpdateAccountLoading,
}) => {
  // User info
  const [userName, setUserName] = useState(profileData().userName);
  const [firstName, setFirstName] = useState(profileData().firstName);
  const [lastName, setLastName] = useState(profileData().lastName);
  const { email } = profileData();

  // New user info for updation
  const [newAccountData, setNewAccountData] = useState(null);

  // Default content
  let content = (
    <Flex
      height='100%'
      paddingX='150px'
      justifyContent='center'
      alignItems='center'
      bgColor='#f5f8f8'
    >
      <Stack width='100%' paddingRight='70px'>
        <Text fontSize='2xl' fontWeight='bold'>
          Profile Settings
        </Text>
        <SettingsField
          heading='Username'
          value={userName}
          disabled={false}
          checkUserNameAvailability={false}
          // userNameAvailable={sendUserNameAvailable}
          leftElement={<Icon as={AiOutlineUser} />}
          onChange={(e) => {
            setUserName(e.target.value);
            setNewAccountData({ ...newAccountData, userName: e.target.value });
          }}
          // onBlur={() => {
          //   if (newAccountData != null && newAccountData.userName != null) {
          //     // Sending userName in props to check if available or not to SettingsMain
          //     getUserNameCheckData(newAccountData.userName);
          //   }
          // }}
        />
        <SettingsField
          heading='First Name'
          value={firstName}
          disabled={false}
          checkUserNameAvailability={false}
          leftElement={<Icon as={AiOutlineUser} />}
          onChange={(e) => {
            setFirstName(e.target.value);
            setNewAccountData({ ...newAccountData, firstName: e.target.value });
          }}
        />
        <SettingsField
          heading='Last Name'
          value={lastName}
          disabled={false}
          checkUserNameAvailability={false}
          leftElement={<Icon as={AiOutlineUser} />}
          onChange={(e) => {
            setLastName(e.target.value);
            setNewAccountData({ ...newAccountData, lastName: e.target.value });
          }}
        />
        <SettingsField
          heading='Email'
          value={email}
          disabled
          checkUserNameAvailability={false}
          leftElement={<Icon as={AiOutlineMail} />}
        />
        <Button
          width='60%'
          colorScheme='codeRoyale'
          onClick={() => {
            // Send new account data in props to Settings.js for updating account
            getUpdateAccountData(newAccountData);
          }}
        >
          Save Settings
        </Button>
        <Button
          width='60%'
          colorScheme='red'
          onClick={() => {
            // Send trigger to Settings.js to delete account in props
            getDeleteAccount();
          }}
        >
          Delete my account
        </Button>
      </Stack>
      <Image src={settings} alt='Settings' boxSize='400px' />
    </Flex>
  );

  // Show loading if user deletes or updates account
  if (sendDeleteAccountLoading || sendUpdateAccountLoading) {
    content = (
      <Flex
        height='100%'
        paddingX='150px'
        justifyContent='center'
        alignItems='center'
        bgColor='#f5f8f8'
      >
        <Stack width='100%' paddingRight='70px'>
          <Text fontSize='2xl' fontWeight='bold'>
            Profile Settings
          </Text>
          <SettingsField
            heading='Username'
            value={userName}
            disabled={false}
            checkUserNameAvailability={false}
            // userNameAvailable={sendUserNameAvailable}
            leftElement={<Icon as={AiOutlineUser} />}
            onChange={(e) => {
              setUserName(e.target.value);
              setNewAccountData({
                ...newAccountData,
                userName: e.target.value,
              });
            }}
            // onBlur={() => {
            //   if (newAccountData != null && newAccountData.userName != null) {
            //     // Sending userName in props to check if available or not to SettingsMain
            //     getUserNameCheckData(newAccountData.userName);
            //   }
            // }}
          />
          <SettingsField
            heading='First Name'
            value={firstName}
            disabled={false}
            checkUserNameAvailability={false}
            leftElement={<Icon as={AiOutlineUser} />}
            onChange={(e) => {
              setFirstName(e.target.value);
              setNewAccountData({
                ...newAccountData,
                firstName: e.target.value,
              });
            }}
          />
          <SettingsField
            heading='Last Name'
            value={lastName}
            disabled={false}
            checkUserNameAvailability={false}
            leftElement={<Icon as={AiOutlineUser} />}
            onChange={(e) => {
              setLastName(e.target.value);
              setNewAccountData({
                ...newAccountData,
                lastName: e.target.value,
              });
            }}
          />
          <SettingsField
            heading='Email'
            value={email}
            disabled
            checkUserNameAvailability={false}
            leftElement={<Icon as={AiOutlineMail} />}
          />
          <Spinner color='#dd2c00' />
        </Stack>
        <Image src={settings} alt='Settings' boxSize='400px' />
      </Flex>
    );
  }

  return content;
};

export default SettingsBody;
