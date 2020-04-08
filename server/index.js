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

// Database
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

// App
const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// Routes
const authRoutes = require('./routes/authRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

app.use('/auth', authRoutes);
app.use('/api', passport.authenticate('jwt', { session : false }), reminderRoutes);

// Server
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log('Listening at PORT: ', PORT);
});