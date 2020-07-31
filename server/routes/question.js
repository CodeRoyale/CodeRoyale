const express = require('express');

const route = express.Router();

const {
  getQuestion,
  putQuestion,
  deleteQuestion,
  deleteQuestionById,
  patchQuestionById,
} = require('../controllers/questionController');

route.post('/', putQuestion);

route.get('/', getQuestion);

route.delete('/', deleteQuestion);

route.delete('/:questionId', deleteQuestionById);

route.patch('/:questionId', patchQuestionById);

module.exports = route;
