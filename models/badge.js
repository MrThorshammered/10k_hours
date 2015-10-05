var mongoose = require('mongoose');
var badgeSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Badge = mongoose.model('Badge', badgeSchema);

module.exports = Badge