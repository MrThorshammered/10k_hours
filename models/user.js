var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: String,
  discipline: String,
  // logs: [Log.schema],
  badges: {type: mongoose.Schema.ObjectId, ref: 'Badge'}
  
});

var User = mongoose.model('User', UserSchema);

module.exports = User