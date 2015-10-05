var mongoose = require('mongoose');
var BadgeSchema = new mongoose.Schema({
  name: String,
  image: Text
});

var Badge = mongoose.model('Badge', BadgeSchema);

module.exports = Badge