// Import Depencies
import express from 'express';
import internalIp from 'internal-ip';
import logger from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import request from 'request';

// Import from Files
import { mongoose } from './models/models';
import { sessionSecret } from '../../private/secrets';
import routes from './api/routes';
import { Server } from 'https';

// Sessions for Cookies
const MongoStore = require('connect-mongo')(session);
const app = express();

// Middleware
app.set('trust proxy', 1);
app.use(logger('dev'));
app.use(express.static('dist'));
app.use(bodyParser.json({ type: "*/*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  name: 'ctCookie',
  secret: sessionSecret,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// API Routes
app.use('/', routes);

function compile(s, l, vI) {
    const cI = '771d82a586d3f76e15e5c0e7d2d64bce'
    const cS = '37939d9e0029dafe91ca0c5170059f9f54c65a0cd207a9f15d951e4ba9017d3a'
    const program = {
      script: s,
      language: l,
      versionIndex: vI,
      clientId: cI,
      clientSecret: cS
    };
    request({
      url: 'https://api.jdoodle.com/execute',
      method: 'POST',
      json: program
    },
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  }

console.log(compile('print(1)', 'python3', '2'))

function isError(body) {
    if (body.slice(0, 10) === '\nTraceback') {
      return true;
    }
    return false;
}

// Start Listening on Server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running at http://${internalIp.v4.sync()}:${port}/`));
