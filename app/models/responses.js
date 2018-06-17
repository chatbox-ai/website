const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var responsesSchema = mongoose.Schema({
  response: String,
  question: [{type: String, unique: true}],
});

// create the model for users and expose it to our app
module.exports = mongoose.model('ResponsesSchema', responsesSchema);
