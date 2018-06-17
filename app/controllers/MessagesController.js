const
  request = require('request')

exports.webhookPost = async function(req, res) {
  var data = req.body

  var user = await User.findById(req.params.userId).populate('facebook.page').exec()

  if (data.object == 'page') {
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id
      var timeOfEvent = pageEntry.time

      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.optin) {
          receivedAuthentication(messagingEvent)
        } else if (messagingEvent.message) {
          receivedMessage(messagingEvent, user.facebook.page.access_token)
        } else if (messagingEvent.delivery) {
          receivedDeliveryConfirmation(messagingEvent)
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent)
        } else if (messagingEvent.read) {
          receivedMessageRead(messagingEvent)
        } else if (messagingEvent.account_linking) {
          receivedAccountLink(messagingEvent)
        } else {
          console.log("Webhook received unknown messagingEvent: ", messagingEvent)
        }
      })
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
}

exports.webhookGet = (req, res) => {
  var VERIFY_TOKEN =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  VERIFY_TOKEN = 'TOKEN'

  var mode = req.query['hub.mode']
  var token = req.query['hub.verify_token']
  var challenge = req.query['hub.challenge']

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      console.log('WEBHOOK_VERIFIED')
      res.status(200).send(challenge)
    } else {
      res.sendStatus(403)
    }
  }
}

function receivedMessage(event, access_token) {
  var senderID = event.sender.id
  var recipientID = event.recipient.id
  var timeOfMessage = event.timestamp
  var message = event.message

  var isEcho = message.is_echo
  var messageId = message.mid
  var appId = message.app_id
  var metadata = message.metadata

  // You may get a text or attachment but not both
  var messageText = message.text
  var messageAttachments = message.attachments
  var quickReply = message.quick_reply

  if (isEcho) {
    // Just logging message echoes to console
    console.log("Received echo for message %s and app %d with metadata %s",
      messageId, appId, metadata)
    return
  } else if (quickReply) {
    var quickReplyPayload = quickReply.payload
    console.log("Quick reply for message %s with payload %s",
      messageId, quickReplyPayload)

    sendTextMessage(senderID, "Quick reply tapped", access_token)
    return
  }

  if (messageText) {
    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      case 'hey':
        sendHiMessage(senderID, access_token)
        break

      default:
        sendCantHandleMessage(senderID, messageText, access_token)
    }
  }
}

function sendHiMessage(recipientId, access_token) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: 'Hey back at you! What would you like to know?'
    }
  }

  callSendAPI(messageData, access_token)
}

function sendCantHandleMessage(recipientId, messageText, access_token) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: 'Sorry I cannot process this message yet',
    }
  }

  callSendAPI(messageData, access_token)
}

function receivedDeliveryConfirmation(event) {
  var senderID = event.sender.id
  var recipientID = event.recipient.id
  var delivery = event.delivery
  var messageIDs = delivery.mids
  var watermark = delivery.watermark
  var sequenceNumber = delivery.seq

  if (messageIDs) {
    messageIDs.forEach(function(messageID) {
      console.log("Received delivery confirmation for message ID: %s",
        messageID)
    })
  }

  console.log("All message before %d were delivered.", watermark)
}

function callSendAPI(messageData, access_token) {
  request({
    uri: 'https://graph.facebook.com/v3.0/me/messages',
    qs: { access_token: access_token },
    method: 'POST',
    json: messageData
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id
      var messageId = body.message_id

      if (messageId) {
        console.log("Successfully sent message with id %s to recipient %s",
          messageId, recipientId)
      } else {
      console.log("Successfully called Send API for recipient %s",
        recipientId)
      }
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error)
    }
  })
}
