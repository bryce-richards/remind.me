const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

// only use dotenv if not in production environment
(require('dotenv').config({ 
  silent: process.env.NODE_ENV === 'production' 
}));

const MONGO_URI = process.env.MONGO_URI;

// Models
require('./models/User');
require('./models/Reminder');

// Services
require('./services/passport');
const scheduler = require('./services/scheduler');

// Routes
const authRoutes = require('./routes/authRoutes');
const verifyRoutes = require('./routes/verifyRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

// Database
mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useFindAndModify: false,
  useUnifiedTopology: true
});

// App
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.use('/auth', authRoutes);
app.use('/verify', verifyRoutes);
// authenticate api routes with jwt
app.use('/api', passport.authenticate('jwt', { session : false }), reminderRoutes);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Listening at PORT: ', PORT);
});

// start cron job
scheduler.start();