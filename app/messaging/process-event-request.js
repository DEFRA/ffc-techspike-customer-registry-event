const processEventRequest = async (message, receiver) => {
  try {
    const messageBody = message.body
    console.log('Received event request', messageBody)
    await receiver.completeMessage(message)
  } catch (err) {
    await receiver.deadLetterMessage(message)
    console.error('Unable to process event request:', err)
  }
}

module.exports = processEventRequest
