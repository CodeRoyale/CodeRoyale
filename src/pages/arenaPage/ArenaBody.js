import React from 'react';
import { Flex } from '@chakra-ui/react';
import ArenaSolution from './ArenaSolution';
import ArenaProblem from './ArenaProblem';

const ArenaBody = () => {
  const sampleQuestion = {
    tags: [],
    timeLimit: 1,
    sourceLimit: 256,
    _id: '5f5c8eba5ca382001784b190',
    questionTitle: 'Payment Without Change',
    problemCode: 'PMWC',
    description:
      'You have a coins of value n and b coins of value 1. You always pay in exact change, so you want to know if there exist such x and y that if you take x (0≤x≤a) coins of value n and y (0≤y≤b) coins of value 1, then the total value of taken coins will be S.\n\nYou have to answer q\nindependent test cases.',
    format:
      'Input\n\nThe first line of the input contains one integer q\n(1≤q≤104) — the number of test cases. Then q\n\ntest cases follow.\n\nThe only line of the test case contains four integers a\n, b, n and S (1≤a,b,n,S≤109) — the number of coins of value n, the number of coins of value 1, the value n\n\nand the required total value.\nOutput\n\nFor the i\n-th test case print the answer on it — YES (without quotes) if there exist such x and y that if you take x coins of value n and y coins of value 1, then the total value of taken coins will be S\n\n, and NO otherwise.\n\nYou may print every letter in any case you want (so, for example, the strings yEs, yes, Yes and YES will all be recognized as positive answer).',
    io: [
      {
        input: '4\n1 2 3 4\n1 2 3 6\n5 2 6 27\n3 3 5 18\n',
        output: 'YES\nNO\nNO\nYES',
      },
      {
        input: '4\n1 2 3 4\n1 2 3 6\n5 2 6 27\n3 3 5 18\n',
        output: 'YES\nNO\nNO\nYES',
        explanation: 'Have prefect coins',
      },
    ],
    author: 'Nangaa',
    dateAdded: '2020-09-12',
    difficulty: 1,
    __v: 0,
  };

  return (
    <Flex
      pos='absolute'
      top='0'
      right='0'
      bgColor='whitesmoke'
      width='75%'
      flexDir='column'
      padding='1em'
    >
      <ArenaProblem currentQuestion={sampleQuestion} />
      <ArenaSolution />
    </Flex>
  );
};

export default ArenaBody;
