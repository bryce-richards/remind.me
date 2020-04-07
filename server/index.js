const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({path: __dirname + '/.env'});

// Database
require('./models/User');
require('./models/Reminder');
const MONGO_URI = process.env.mongoURI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true });

// App
const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// Routes
require('./routes/authRoutes')(app);
require('./routes/reminderRoutes')(app);

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'client/public', 'index.html'));
});

// Server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log('Listening at PORT: ', PORT);
});