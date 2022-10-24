const { TableClient } = require('@azure/data-tables')
const { connectionString, tableName } = require('./config').storageConfig
let tableClient

const connect = async () => {
  console.log('Connecting to storage', connectionString, tableName)
  tableClient = TableClient.fromConnectionString(connectionString, tableName, { allowInsecureConnection: true })
}

const save = async (data) => {
  await connect()
  await tableClient.createEntity(data)
}

module.exports = {
  save
}
