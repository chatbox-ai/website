const
  LoginController = require('./controllers/LoginController')
  DashboardController = require('./controllers/DashboardController')
  TermsController = require('./controllers/TermsController')
  AiController = require('./controllers/AiController')
  AudienceController = require('./controllers/AudienceController')
  BroadcastController = require('./controllers/BroadcastController')
  ToolsController = require('./controllers/ToolsController')
  SettingsController = require('./controllers/SettingsController')
  PrivacyController = require('./controllers/PrivacyController')
  FacebookController = require('./controllers/FacebookController')
  MessagesController = require('./controllers/MessagesController')

module.exports = function(app, passport) {
  app.get('/', isLoggedIn, DashboardController.index)

  app.get('/ai-training', isLoggedIn, AiController.index)

  app.get('/audience', isLoggedIn, AudienceController.index)

  app.get('/broadcast', isLoggedIn, BroadcastController.index)

  app.get('/tools', isLoggedIn, ToolsController.index)

  app.get('/settings', isLoggedIn, SettingsController.index)

  app.get('/privacy', isLoggedIn, PrivacyController.index)

  app.post('/page/connect/:pageId', FacebookController.connect)

  app.post('/page/disconnect/:pageId', FacebookController.disconnect)

  app.post('/:userId/webhook', MessagesController.webhookPost)

  app.get('/:userId/webhook', MessagesController.webhookGet)

  // Authentication Routes
  app.get('/login', LoginController.login);

  app.get('/signup', LoginController.signup);

  app.get('/logout', LoginController.logout);

  app.get('/terms', TermsController.index);

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope : ['public_profile', 'email', 'manage_pages', 'pages_messaging', 'publish_pages', 'pages_show_list']
  }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/login'
  }));
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
