import React from 'react';
import './ArenaMain.css';

function Problem() {
  let quesList = null;
  let questionIO = null;
  let questionTitle = null;
  let questionCode = null;
  let questionDescription = null;
  let questionFormat = null;

  // This is just Static data...
  const questions = {
    message:[
    {
      questionTitle: 'Joel is Pro', 
      problemCode: 'CML', 
      description: 'This is the Question',
      format: 'Give your CAMEL to Joel \n and solve this problem', 
      io: [
        {
          input: '1 2 3 4 5', 
          output: '1 2 3 4 5', 
          explanation: 'Explanation is Joel is pro and \n nothing to say.'
        },
        {
          input: '1 3 4 7 78', 
          output: '1 2 3 4 78', 
          explanation: 'Omani Camel pro'
        }
      ]
    }]
  }

  if (questions !== undefined) {
    quesList = questions.message;
  }
  
  const currentQuestion = quesList[0];

  if (currentQuestion !== null && currentQuestion.io !== undefined) {
    questionTitle = currentQuestion.questionTitle;
    questionCode = currentQuestion.problemCode;
    questionFormat = currentQuestion.format;
    questionDescription = currentQuestion.description;
    questionIO = currentQuestion.io;
  }

  const questionIOView = questionIO.map(data =>
    <>
      <div>
        <div className='problem-heading'><b>Input</b></div>
        {data.input}
        <div className='problem-heading'><b>Output</b></div>
        {data.output}
        <div className='problem-heading'><b>Explanation</b></div>
        {data.explanation}
      </div>
      <br/>
    </>
  )

  return (
    <div className='problem'>
      <div className='problem-title'>
        <b>{questionTitle}</b>
      </div>
      <div className='problem-code'>
        {questionCode}
      </div>
      <br/>

      <div className='problem-heading'><b>Description</b></div>
      <div>
        <p>{questionDescription}</p>
      </div>
      <br/>

      <div className='problem-heading'><b>Format</b></div>
      <div><p>{questionFormat}</p></div>
      <br/>

      {questionIOView}
    </div>
  )

}

export default Problem;
