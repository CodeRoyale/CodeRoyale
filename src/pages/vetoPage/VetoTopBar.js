import React from 'react';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import Timer from '../../components/timer/Timer';

const VetoTopBar = ({ vetoTime }) => {
  return (
    <Flex
      bg='white'
      height='115px'
      width='100%'
      alignItems='center'
      padding='1.47em'
    >
      <Stack width='100%'>
        <Text fontSize='md' fontWeight='bold'>
          Veto Time Left
        </Text>
        <Timer milliseconds={vetoTime} />
      </Stack>
      <Stack marginLeft='1em'>
        <Button size='sm'>Veto Status</Button>
        <Button size='sm'>Confirm Veto</Button>
      </Stack>
    </Flex>
  );
};

export default VetoTopBar;
