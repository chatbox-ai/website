exports.index = function(req, res) {
  res.render('dashboard', {
    user : req.user // get the user out of session and pass to template
  })
}
