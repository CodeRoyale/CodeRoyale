const express = require('express');
const checkAuth = require('../middleware/checkAuth');

const route = express.Router();

const {
  putQuestion,
  getRandom,
  getQuestion,
  getQuestionById,
  deleteQuestion,
  deleteQuestionById,
  patchQuestionById,
} = require('../controllers/questionController');

const {
  putTestcase,
  getTestcase,
} = require('../controllers/testcaseController');

route.post('/', checkAuth, putQuestion);

route.post('/testcase', checkAuth, putTestcase);

route.get('/getTestcase', checkAuth, getTestcase);

route.get('/random', checkAuth, getRandom);

route.get('/question', checkAuth, getQuestion);

route.post('/getQById', checkAuth, getQuestionById);

route.delete('/deleteAll', checkAuth, deleteQuestion);

route.delete('/deleteById/:questionId', checkAuth, deleteQuestionById);

route.patch('/:questionId', checkAuth, patchQuestionById);

module.exports = route;
