import React, { useState } from 'react';
import {
  Flex,
  Stack,
  Text,
  Spacer,
  Checkbox,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import useVetoVote from '../../global-stores/useVetoVote';
import useRoom from '../../global-stores/useRoom';
import useUserVetoed from '../../global-stores/useUserVetoed';

const VetoQuestionCard = ({
  questionID,
  questionNumber,
  questionTitle,
  questionDesc,
  questionTags,
}) => {
  const toast = useToast();
  const room = useRoom((state) => state.room);
  const vetoVotedQuestions = useVetoVote((state) => state.vetoVotedQuestions);
  const addVetoVote = useVetoVote((state) => state.addVetoVote);
  const removeVetoVote = useVetoVote((state) => state.removeVetoVote);
  const userVetoed = useUserVetoed((state) => state.userVetoed);
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);

  // Handle user voting for question
  // Show alert if user exceeds question vote max limit
  const handleQuestionVoted = () => {
    // If checkbox is ticked and user clicks on questionCard then remove question from votes
    if (checkBoxChecked) {
      removeVetoVote(questionID);
      setCheckBoxChecked(false);
    } else if (
      //! changed max_vote
      vetoVotedQuestions.length < room.competition.veto.maxVote &&
      !checkBoxChecked
    ) {
      addVetoVote(questionID);
      setCheckBoxChecked(true);
    } else {
      toast({
        title: `Maximum questions allowed for voting is ${room.competition.veto.max_vote}`,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      setCheckBoxChecked(false);
    }
  };

  // Display tags from API
  const tagsText = questionTags.map((item) => (
    <Text key={uuidv4()} fontSize='md' fontWeight='bold'>
      {item}
    </Text>
  ));

  return (
    <Flex
      as='div'
      bgColor='white'
      padding='2em'
      margin='2em'
      cursor='pointer'
      transition='0.5s ease'
      boxShadow='0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)'
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: `0 1px 5px 0 rgb(221, 44, 0, 0.2),
      0 1px 1px 0 rgba(221, 44, 0, 0.19)`,
      }}
      pointerEvents={userVetoed ? 'none' : 'auto'}
      onClick={handleQuestionVoted}
    >
      <Stack width='100%'>
        <Flex>
          <Flex alignItems='center'>
            <Text fontWeight='bold' fontSize='3xl' color='#6e6e6e'>
              #{questionNumber}
            </Text>
            {checkBoxChecked ? (
              <Badge ml='1em' colorScheme='codeRoyale'>
                Selected
              </Badge>
            ) : null}
          </Flex>
          <Spacer />
          <Checkbox
            colorScheme='codeRoyale'
            isChecked={checkBoxChecked}
            onChange={handleQuestionVoted}
          />
        </Flex>
        <Text fontWeight='bold' fontSize='2xl'>
          {questionTitle}
        </Text>
        <Text fontSize='lg'>{questionDesc}</Text>
        {tagsText}
      </Stack>
    </Flex>
  );
};

export default VetoQuestionCard;
