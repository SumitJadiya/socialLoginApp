const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth')
const app = express()
const passportConfig = require('./passport/passport')
const passport = require('passport')
const cookieSession = require('cookie-session')

const DB_URL = 'mongodb+srv://admin:admin@cluster0.5mgkk.mongodb.net/socialLogin'

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(`Connected to database !`))
  .catch((err) => {
    console.log(`Unable to connect to database ${err}`)
    process.exit(1)
  })

app.use(
  cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: ['key1key2'],
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
app.use('/auth', auth)

const isLoggedIn = (req, res, next) => {
  if (!req.user) res.redirect('/auth/login')
  next()
}

app.get('/', isLoggedIn, (req, res) => {
  res.render('home')
})

app.listen(4000, () => console.log('server running at 4000'))
