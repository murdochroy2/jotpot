require('dotenv').config()

const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv')
const fs = require('fs');
const https = require('https');
const path = require('path');
const http = require('http');

dotenv.config()

const app = express()
// const port = 5000
app.use(cors())
app.use(express.json())

// Serve React static files from the 'build' directory
app.use(express.static(path.join(__dirname, '../build')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/v2', require('./routes/news'));

// Serve React app for other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const port = 5000
app.listen(port, () => {
  console.log(`JotPot app listening on port ${port}`)
})

connectToMongo();
