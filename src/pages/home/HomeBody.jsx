import React from 'react';
import { useHistory } from 'react-router-dom';
import { Stack, Flex, Text, Image, Button } from '@chakra-ui/react';
import winning from '../../assets/winning.svg';
import laptopCoding from '../../assets/laptop-coding.svg';
import laptop from '../../assets/laptop.svg';
import DiscordBanner from './DiscordBanner';
import HomeFooter from './HomeFooter';
import './Home.css';

const HomeBody = () => {
  const history = useHistory();

  return (
    <Stack>
      <Flex
        height='100vh'
        justifyContent='center'
        alignItems='center'
        padding='6em'
        bgColor='#fcede8'
      >
        <Stack width='100%'>
          <Text fontSize='5xl' fontWeight='bold'>
            A new way to compete in{' '}
            <span className='home-body-span'>coding</span>
          </Text>
          <Text fontSize='lg'>
            Challenge teams/individuals to a coding match today for free
          </Text>
          <Button
            width='30%'
            size='lg'
            colorScheme='codeRoyale'
            onClick={() => history.push('/signup')}
          >
            Sign up now
          </Button>
        </Stack>
        <Image src={winning} alt='Winning' boxSize='450px' />
      </Flex>
      <Flex
        justifyContent='center'
        alignItems='center'
        padding='6em'
        bgColor='white'
      >
        <Stack justifyContent='center' alignItems='center'>
          <Text fontSize='4xl' fontWeight='bold'>
            What is CodeRoyale?
          </Text>
          <Text fontSize='lg'>
            CodeRoyale is a competitive programming platform that lets coders
            from <br /> around the World create teams/solo to compete with other
            coders.
          </Text>
          <Image src={laptopCoding} alt='Laptop Coding' boxSize='250px' />
        </Stack>
      </Flex>
      <Flex
        justifyContent='center'
        alignItems='center'
        padding='6em'
        bgColor='#fcede8'
      >
        <Stack>
          <Text fontSize='4xl' fontWeight='bold'>
            How does it <span className='home-body-span'>work?</span>
          </Text>
          <Text fontSize='lg'>
            1. Create a room
            <br />
            2. Make teams
            <br />
            3. Select a question to fight
            <br />
            4. Code away!
            <br />
          </Text>
        </Stack>
        <Image src={laptop} alt='Laptop' boxSize='450px' marginLeft='2.5em' />
      </Flex>
      <Flex
        justifyContent='center'
        alignItems='center'
        padding='6em'
        bgColor='white'
      >
        <Stack justifyContent='center' alignItems='center'>
          <Text fontSize='5xl' fontWeight='bold' textAlign='center'>
            It takes only 1 min to sign up <br />
            and <span className='home-body-span'>it&apos;s free!</span>
          </Text>
          <Button
            width='30%'
            marginTop='0.8em'
            size='lg'
            colorScheme='codeRoyale'
            onClick={() => history.push('/signup')}
          >
            Sign up
          </Button>
        </Stack>
      </Flex>
      <DiscordBanner />
      <HomeFooter />
    </Stack>
  );
};

export default HomeBody;
