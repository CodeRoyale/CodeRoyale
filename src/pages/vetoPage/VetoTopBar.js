import React from 'react';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import Timer from '../../components/timer/Timer';

const VetoTopBar = (props) => {
  return (
    <Flex bg='gray' height='14%' width='100%' alignItems='center' padding='1em'>
      <Stack width='100%'>
        <Text fontSize='md' fontWeight='bold'>
          Veto Time Left
        </Text>
        <Timer milliseconds={1700000} />
      </Stack>
      <Stack marginLeft='1em'>
        <Button size='sm'>Veto Status</Button>
        <Button size='sm'>Confirm Veto</Button>
      </Stack>
    </Flex>
  );
};

export default VetoTopBar;
