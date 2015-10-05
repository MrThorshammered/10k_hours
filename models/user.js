var mongoose = require('mongoose');
var Log = mongoose.model('Log');
var bcrypt   = require('bcrypt-nodejs');

// var userSchema = new mongoose.Schema({
//   name: {type: String, required: true},
//   password: String,
//   discipline: String,
//   logs: [Log.schema],
//   badges: {type: mongoose.Schema.ObjectId, ref: 'Badge'}
  
// });

var userSchema = new mongoose.Schema({

    local            : {
        email        : String,
        name         : String,
        password     : String,
        discipline   : String,
        logs: [Log.schema],
        badges: {type: mongoose.Schema.ObjectId, ref: 'Badge'}
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


var User = mongoose.model('User', userSchema);

module.exports = User