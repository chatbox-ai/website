const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var facebookPageSchema = mongoose.Schema({
  name: String,
  page_id: {type: String, unique: true},
  access_token: {type: String, unique: true},
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

facebookPageSchema.methods.pageAccessToken = function() {

}

// create the model for users and expose it to our app
module.exports = mongoose.model('FacebookPage', facebookPageSchema);
