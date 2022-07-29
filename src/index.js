const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./database/connection')
const routes = require('./routes')

app.use(cors({
  origin: '*'
}))

app.db = db
app.use(express.json())
app.use(routes)

app.listen(3000, () => {
  console.log('Backend is running...')
})