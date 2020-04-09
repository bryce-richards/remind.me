const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config({path: __dirname + '/.env'});

const MONGO_URI = process.env.mongoURI;

require('./models/User');
require('./models/Reminder');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

// Database
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false });

// App
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// Routes
app.use('/auth', authRoutes);
app.use('/api', passport.authenticate('jwt', { session : false }), reminderRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log('Listening at PORT: ', PORT);
});