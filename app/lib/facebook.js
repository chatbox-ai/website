const
  request = require('request')
  rp = require('request-promise')

class Facebook {
  constructor(accessToken) {
    this.url = 'https://graph.facebook.com/v3.0/'
    this.accessToken = accessToken
  }

  async listPages() {
    try {
      var pages = await rp(this.url + 'me/accounts?access_token=' + this.accessToken)

      return JSON.parse(pages)
    } catch (e) {
        console.log(e);
    }
  }

  async subscribedApps(pageId, accessToken) {
    try {
      var options = {
        method: 'GET',
        uri: this.url + pageId + '/subscribed_apps?access_token=' + accessToken,
      }

      var pages = await rp(options)

      console.log(pages);

      return JSON.parse(pages)
    } catch (e) {
        console.log(e);
    }
  }

  async subscribeApp(pageId, accessToken) {
    try {
      var options = {
        method: 'POST',
        uri: this.url + pageId + '/subscribed_apps?access_token=' + accessToken,
      }

      var pages = await rp(options)

      return JSON.parse(pages)
    } catch (e) {
        console.log(e);
    }
  }

  async removeSubscribedApp(pageId, accessToken) {
    try {
      var options = {
        method: 'DELETE',
        uri: this.url + pageId + '/subscribed_apps?access_token=' + accessToken,
      }

      var pages = await rp(options)

      return JSON.parse(pages)
    } catch (e) {
        console.log(e);
    }
  }
}

module.exports = Facebook
