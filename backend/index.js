const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, "0.0.0.0", () => {
  console.log(`JotPot app listening on port ${port}`)
})

connectToMongo();
