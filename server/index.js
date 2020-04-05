const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config({path: __dirname + '/.env'});

// Database
const MONGO_URI = process.env.mongoURI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true });

// App
const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// Routes
require('./routes/authRoutes')(app);

// Server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log('Listening at PORT: ', PORT);
});