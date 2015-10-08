var mongoose = require('mongoose');
var logSchema = new mongoose.Schema({
  name: String,
  date: Date,
  type: String,
  hours: Number,
  notes: String,
  video: String
});

var Log = mongoose.model('Log', logSchema);

module.exports = Log


