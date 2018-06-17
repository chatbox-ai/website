const
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  engine = require('ejs-blocks'),
  bugsnag = require('bugsnag'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  dotenv = require('dotenv'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  flash = require('connect-flash')

dotenv.load()

const port = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL)

require('./app/lib/passport')(passport);

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// Create bugsnag instance
bugsnag.register(process.env.BUGSNAG_API_KEY)
app.use(bugsnag.requestHandler)
app.use(bugsnag.errorHandler)

app.engine('ejs', engine)
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules'))
app.set('views', __dirname + '/views/')
app.set('view engine', 'ejs')

// required for passport
app.use(session({ secret: 'sapiowebisintelligence' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port);
