import React from 'react';
import { Flex, Progress, Text } from '@chakra-ui/react';

const CountBar = ({ count, total }) => {
  const percent = (count / total) * 100;
  return (
    <Flex alignItems='center' justifyContent='center'>
      <Text fontWeight='bold'>{count}</Text>
      <Progress
        marginLeft='0.5em'
        marginRight='0.5em'
        value={percent}
        width='100%'
        colorScheme='codeRoyale'
      />
      <Text fontWeight='bold'>{total}</Text>
    </Flex>
  );
};

export default CountBar;
