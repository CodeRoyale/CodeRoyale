import React from 'react';
import { Box, Flex, Heading, Text, Icon, chakra } from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';

const DiscordBanner = () => (
  <Box bg='#7289DA' display='flex' alignItems='center' justifyContent='center'>
    <Flex color='white' alignItems='center' padding='1.5em'>
      <Box fontSize='48px' mr='5'>
        <Icon as={FaDiscord} />
      </Box>
      <Box>
        <Heading size='md' lineHeight='1.2' mb='1'>
          Connect with the community
        </Heading>
        <Text opacity={0.7}>
          Feel free to ask questions, report issues, and meet new people.
        </Text>
      </Box>
      <chakra.button
        width={{ base: '100%', md: 'auto' }}
        mt={{ base: '6', md: 0 }}
        color='gray.800'
        as='a'
        justifyContent='center'
        display='inline-flex'
        alignItems='center'
        href='https://discord.gg/aCKem4h8te'
        rel='noopener'
        target='_blank'
        fontWeight='bold'
        shadow='md'
        bg='white'
        px='24px'
        h='56px'
        rounded='lg'
        fontSize='md'
        marginLeft='1em'
      >
        Join our Discord!
      </chakra.button>
    </Flex>
  </Box>
);

export default DiscordBanner;
