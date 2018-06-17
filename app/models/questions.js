const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var questionsSchema = mongoose.Schema({
  content: String,
  answers: [{type: String, unique: true}],
});

// create the model for users and expose it to our app
module.exports = mongoose.model('QuestionsSchema', questionsSchema);
