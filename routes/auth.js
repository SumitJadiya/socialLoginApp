const { render } = require('ejs')
const passport = require('passport')

const router = require('express').Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
  (req, res) => {
    res.send('login with google')
  }
)

module.exports = router
