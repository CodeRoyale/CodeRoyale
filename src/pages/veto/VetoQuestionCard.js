import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addVetoVote, removeVetoVote } from '../../actions/vetoActions';
import {
  Flex,
  Stack,
  Text,
  Spacer,
  Checkbox,
  Badge,
  useToast,
} from '@chakra-ui/react';

const VetoQuestionCard = ({
  questionID,
  questionNumber,
  questionTitle,
  questionDesc,
  questionTags,
  addVetoVote,
  removeVetoVote,
  vetoData,
  roomData,
  userVoted,
}) => {
  const toast = useToast();
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);

  // Handle user voting for question
  // Show alert if user exceeds question vote max limit
  const handleQuestionVoted = () => {
    // If checkbox is ticked and user clicks on questionCard then remove question from votes
    if (checkBoxChecked) {
      removeVetoVote(questionID);
      setCheckBoxChecked(false);
    } else if (
      vetoData.vetoVotedQuestions.length <
        roomData.data.competition.veto.max_vote &&
      !checkBoxChecked
    ) {
      addVetoVote(questionID);
      setCheckBoxChecked(true);
    } else {
      toast({
        title: `Maximum questions allowed for voting is ${roomData.data.competition.veto.max_vote}`,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      setCheckBoxChecked(false);
    }
  };

  // Display tags from API
  let tagsText = questionTags.map((item, index) => {
    return (
      <Text key={index} fontSize='md' fontWeight='bold'>
        {item}
      </Text>
    );
  });

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
      pointerEvents={userVoted ? 'none' : 'auto'}
      onClick={handleQuestionVoted}
    >
      <Stack width='100%'>
        <Flex>
          <Flex alignItems='center'>
            <Text fontWeight='bold' fontSize='3xl' color='#6e6e6e'>
              #{questionNumber}
            </Text>
            {checkBoxChecked ? (
              <Badge ml='1em' colorScheme='orange'>
                Selected
              </Badge>
            ) : null}
          </Flex>
          <Spacer />
          <Checkbox
            colorScheme='orange'
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

const mapStateToProps = (state) => ({
  vetoData: state.vetoData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { addVetoVote, removeVetoVote })(
  VetoQuestionCard
);