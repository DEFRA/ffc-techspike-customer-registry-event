const Joi = require('joi')

const storageSchema = Joi.object({
  connectionString: Joi.string().required(),
  tableName: Joi.string().default('events'),
  useConnectionString: Joi.bool().default(true)
})

const storageConfig = {
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  tableName: process.env.AZURE_STORAGE_TABLE_NAME
}

const storageResult = storageSchema.validate(storageConfig, {
  abortEarly: false
})

if (storageResult.error) {
  throw new Error(`The storage config is invalid. ${storageResult.error.message}`)
}

module.exports = storageResult.value
