// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : process.env.FACEBOOK_APP_ID, // your App ID
        'clientSecret'  : process.env.FACEBOOK_SECRET_KEY, // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    }
  }