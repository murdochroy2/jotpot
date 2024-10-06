require('dotenv').config()

const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/v2', require('./routes/news'));

app.listen(port, "0.0.0.0", () => {
  console.log(`JotPot app listening on port ${port}`)
})

connectToMongo();
