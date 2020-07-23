const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionTitle: {
    type: String,
    required: true,
  },
  problemCode: {
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
  dateAdded: {
    type: String,
    required: true,
  },
  timeLimit: {
    type: Number,
    required: true,
    default: 1,
  },
  sourceLimit: {
    type: Number,
    required: true,
    default: 50000,
  },
  difficulty: {
    type: Number,
    required: true,
  },
});

// eslint-disable-next-line prettier/prettier
module.exports = mongoose.model('question', questionSchema);