var mongoose = require('mongoose');
var Log = mongoose.model('Log');

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: String,
  discipline: String,
  logs: [Log.schema],
  badges: {type: mongoose.Schema.ObjectId, ref: 'Badge'}
  
});

var User = mongoose.model('User', userSchema);

module.exports = User