import React from 'react';
import { Loader } from 'rsuite';
import QuestionCard from '../../components/questionCard/QuestionCard';
import './VetoMain.css';

const VetoBody = (props) => {
  let questionCards = null;
  const { isLoading, questions } = props;
  const questionsArray = questions.message;

  // Send selected question in props
  const handleQuestionVoted = (value) => {
    props.getVotedQuestion(value);
  };

  // const sendVotes = () => {
  //   socket.emit('VETO_VOTES')
  // }

  // Mapping questions in QuestionCard
  if (questionsArray !== undefined) {
    questionCards = questionsArray.map((item, index) => {
      return (
        <QuestionCard
          key={item._id}
          questionNumber={index}
          questionTitle={item.questionTitle}
          questionDesc={item.description}
          questionID={item._id}
          questionTags={item.tags}
          getVotedQuestion={handleQuestionVoted}
        />
      );
    });
  }

  // Default content
  let content = (
    <div className='veto-body'>
      <div className='veto-body-question'>{questionCards}</div>
    </div>
  );

  if (isLoading) {
    content = (
      <div className='veto-body-loading'>
        <Loader size='md' content='Fetching veto questions...' />
      </div>
    );
  }

  return content;
};

export default VetoBody;
