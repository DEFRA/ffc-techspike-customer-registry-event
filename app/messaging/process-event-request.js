const validateEvent = require('../event/event-schema')
const saveEvent = require('../event/save-event')

const processEventRequest = async (message, receiver) => {
  try {
    const messageBody = message.body
    console.log('Received event request', messageBody)
    if (validateEvent(messageBody)) {
      await saveEvent(messageBody)
      await receiver.completeMessage(message)
    } else {
      console.log('Invalid event request', messageBody)
      receiver.deadLetterMessage(message)
    }
  } catch (err) {
    await receiver.deadLetterMessage(message)
    console.error('Unable to process event request:', err)
  }
}

module.exports = processEventRequest
