const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '768925361321-bg3fo5aqdj0phhtpp65t037i449sd5la.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:4000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user)
      })
    }
  )
)
