const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

require('./models/User');
require('./models/Reminder');
require('dotenv').config({path: __dirname + '/.env'});

const SECRET = process.env.secret;
const MONGO_URI = process.env.mongoURI;

// Database
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

// App
app.use(morgan('combined'));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [SECRET]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/authRoutes')(app);
require('./routes/reminderRoutes')(app);
require('./services/passport');

// Server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log('Listening at PORT: ', PORT);
});