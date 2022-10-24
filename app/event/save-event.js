const { save } = require('../storage')

const saveEvent = async (event) => {
  const eventType = event.name
  const raisedEvent = event.properties
  const sbi = raisedEvent.sbi
  const eventRaised = new Date(raisedEvent.action.timestamp)
  const timespan = new Date(raisedEvent.action.timestamp).getTime()

  const partitionKey = sbi.toString()
  const rowKey = `${partitionKey}_${timespan}`

  const eventLog = {
    PartitionKey: partitionKey,
    RowKey: rowKey,
    EventType: eventType,
    EventRaised: eventRaised,
    Payload: JSON.stringify(raisedEvent.action),
    Status: event.properties.status
  }

  await save(eventLog)
  console.log(`Event saved successfully: partitionKey: ${partitionKey}, rowKey: ${rowKey}`)
}

module.exports = saveEvent
