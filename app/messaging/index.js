const { MessageReceiver } = require('ffc-messaging')
const processDataRequest = require('./process-event-request')
const { eventRequestQueue } = require('../config').messageQueueConfig

let eventReceiver

const start = async () => {
  const eventAction = message => processDataRequest(message, eventReceiver)
  eventReceiver = new MessageReceiver(eventRequestQueue, eventAction)
  await eventReceiver.subscribe()

  console.info('Ready to receive messages')
}

const stop = async () => {
  await eventReceiver.closeConnection()
}

module.exports = { start, stop }
