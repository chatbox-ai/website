const
  User = require('../models/user')
  FacebookPage = require('../models/facebookPage')
  Facebook = require('../lib/facebook')

exports.connect = async function(req, res) {
  var page = new FacebookPage()
  var facebook = new Facebook(req.user.facebook.token)

  page.page_id = req.params.pageId
  page.access_token = req.body.accessToken
  page.user = req.user._id

  var newFacebookPage = await page.save()

  var updatedUser = await User.findOneAndUpdate({_id: req.user._id}, {
    'facebook.page': newFacebookPage._id
  })

  req.user.facebook.page = updatedUser.facebook.page

  facebook.subscribeApp(page.page_id, page.access_token)

  res.send(updatedUser)
}

exports.disconnect = async function(req, res) {
  var facebook = new Facebook(req.user.facebook.token)

  var user = await User.findById(req.user._id).populate('facebook.page').exec()

  var removedPage = await FacebookPage.remove({page_id: user.facebook.page.page_id})

  facebook.removeSubscribedApp(user.facebook.page.page_id, user.facebook.page.access_token)

  user.facebook.page = undefined

  user.save()

  req.user.facebook.page = user.facebook.page

  res.send(user)
}
