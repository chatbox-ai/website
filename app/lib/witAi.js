const
  request = require('request')
  rp = require('request-promise')

class WitAi {
  constructor() {
    this.version = 20180610
    this.url = 'https://api.wit.ai/'
    this.accessToken = '2TIF56GX4C32MYJVXDCJNAQRDSR7JZSG'
  }

  async message(q) {
    try {
      var options = {
        uri: this.url + 'message?v=' + this.version + '&q=' + q,
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }

      var message = await rp(options)

      return JSON.parse(message)
    } catch (e) {
        console.log(e);
    }
  }

  async entitiesList() {
    try {
      var options = {
        uri: this.url + 'entities?v=' + this.verson,
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }

      var entities = await rp(options)

      return JSON.parse(entities)
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = WitAi
