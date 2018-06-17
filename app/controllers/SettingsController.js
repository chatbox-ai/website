const
  Facebook = require('../lib/facebook')
  User = require('../models/user')

exports.index = async function(req, res) {
  connectedFacebookPage = ''
  pages = []

  if (typeof req.user.facebook.token != 'undefined') {
    var facebook = new Facebook(req.user.facebook.token)

    var facebookPages = await facebook.listPages()

    facebookPages.data.forEach(function(page) {
      if (page.perms.indexOf('ADMINISTER') >= 0) {
        pages.push(page)
      }
    })


    if (typeof req.user.facebook.page != 'undefined') {
      var user = await User.findById(req.user._id).populate('facebook.page').exec()

      connectedFacebookPage = user.facebook.page
    }
  }

  res.render('settings', {
    user: req.user,
    facebookPages: pages,
    connectedFacebookPage: connectedFacebookPage
  })
}
