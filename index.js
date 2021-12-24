const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth')
const app = express()
require('./passport/passport')

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

app.set('view engine', 'ejs')
app.use('/auth', auth)

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(4000, () => console.log('server running at 4000'))
