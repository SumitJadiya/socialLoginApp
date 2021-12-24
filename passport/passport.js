const passport = require('passport')
const User = require('../model/user')
var GoogleStrategy = require('passport-google-oauth20').Strategy

passport.serializeUser(function (user, done) {
  done(null, user.id)
})
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(null, user.id)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '768925361321-bg3fo5aqdj0phhtpp65t037i449sd5la.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:4000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, next) => {
      console.log('my profile', profile._json.email)

      User.findOne({ email: profile._json.email })
        .then((user) => {
          if (user) {
            console.log('user already exists in DB', user)
            next(null, user)
          } else {
            User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile._json.email,
            })
              .then((user) => {
                console.log('user =', user)
                next(null, user)
              })
              .catch((err) => console.log(err))
          }
        })
        .catch((err) => console.log(err))
      //   next()
    }
  )
)
