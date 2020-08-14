const express = require('express');

const route = express.Router();

const {
  getQuestion,
  putQuestion,
  deleteQuestion,
  deleteQuestionById,
  patchQuestionById,
  getQuestionById,
} = require('../controllers/questionController');

route.post('/', putQuestion);

route.get('/', getQuestion);

route.post('/getQById', getQuestionById);

route.delete('/deleteAll', deleteQuestion);

route.delete('/deleteById/:questionId', deleteQuestionById);

route.patch('/:questionId', patchQuestionById);

module.exports = route;