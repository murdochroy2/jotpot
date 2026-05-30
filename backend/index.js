const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') })
require('dotenv').config({ path: path.join(__dirname, '.env') })

const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')
const fs = require('fs');
const https = require('https');
const http = require('http');

const app = express()
// const port = 5000
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];
app.use(cors({ origin: allowedOrigins, credentials: true }))
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
app.listen(port, "0.0.0.0", () => {
  console.log(`JotPot app listening on port ${port}`)
})

connectToMongo();
  