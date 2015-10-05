var mongoose = require('mongoose');
var LogSchema = new mongoose.Schema({
  name: String,
  date: Date,
  type: String,
  hours: Number,
  notes: Text,
  video: Text
});

var Log = mongoose.model('Log', LogSchema);

module.exports = Log