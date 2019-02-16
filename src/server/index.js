// Import Depencies
import express from 'express';
import internalIp from 'internal-ip';
import logger from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';

// Import from Files
import { mongoose } from './models/models';
import { sessionSecret } from '../../private/secrets';
import routes from './api/routes';

// Sessions for Cookies
const MongoStore = require('connect-mongo')(session);
const app = express();

// Middleware
app.set('trust proxy', 1)
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

// Start Listening on Server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running at http://${internalIp.v4.sync()}:${port}/`));
