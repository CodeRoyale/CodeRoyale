const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_title: {
    type: String,
    required: true,
  },
  problem_code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  date_added: {
    type: String,
    required: true, 
  },
  time_limit: {
    type: Number,
    required: true,
    default: 1,
  },
  source_limit:{
    type: Number,
    required: true,
    default: 50000,
  },
  difficulty:{
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('question', questionSchema);

