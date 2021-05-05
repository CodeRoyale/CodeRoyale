import { Flex } from '@chakra-ui/layout';
import React from 'react';
import VetoQuestions from './VetoQuestions';
import VetoTopBar from './VetoTopBar';

const VetoBody = ({
  vetoTime,
  vetoUsers,
  vetoCompletedUsers,
  questionsLoading,
  questions,
  userProfilePictures,
  confirmVetoVotes,
  userVoted,
}) => {
  // Sending confirm veto in props
  const handleConfirmVetoVotes = () => {
    confirmVetoVotes();
  };

  return (
    <Flex
      pos='absolute'
      top='0'
      right='0'
      height='100%'
      bgColor='white'
      width='75%'
      flexDir='column'
    >
      <VetoTopBar
        vetoUsers={vetoUsers}
        vetoCompletedUsers={vetoCompletedUsers}
        vetoTime={vetoTime}
        userProfilePictures={userProfilePictures}
        confirmVetoVotes={handleConfirmVetoVotes}
        userVoted={userVoted}
      />
      <VetoQuestions
        questionsLoading={questionsLoading}
        questions={questions}
        userVoted={userVoted}
      />
    </Flex>
  );
};

export default VetoBody;
