exports.login = function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('login', {
    message: req.flash('loginMessage')
  })
}

exports.signup = function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('signup', {
    message: req.flash('signupMessage')
  });
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}
