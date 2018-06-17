const
  Questions = require('../models/questions')
  Responses = require('../models/responses')
  WitAi = require('../lib/witAi')

exports.index = async function(req, res) {
  var questions = []

  wit = new WitAi()

  console.log(await wit.entitiesList());

  // Questions with response reponse references

  res.render('ai', {
    user: req.user,
    questions: questions
  })
}
