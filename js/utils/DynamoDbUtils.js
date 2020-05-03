
const RETURN_TYPES = {
  NONE: 'NONE',
  ALL_OLD: 'ALL_OLD',
  UPDATED_OLD: 'UPDATED_OLD',
  ALL_NEW: 'ALL_NEW',
  UPDATED_NEW: 'UPDATED_NEW'
}

const SK_COMBINER = '_'

const TABLE_NAMES = {
  SIKSHYA_TABLE: 'SikshyaSchoolData-dev'
}

const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB({
  region: process.env.AWS_REGION || 'us-east-1'
})

const putItem = async (item) => {
  const params = {
    Item: item,
    ReturnConsumedCapacity: RETURN_TYPES.NONE,
    TableName: 'SikshyaSchoolData-dev'
  }
  try {
    await dynamodb.putItem(params).promise()
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

const deleteItem = async ({ key, conditional, operator }) => {
  const params = {
    Key: key,
    ReturnConsumedCapacity: RETURN_TYPES.NONE,
    TableName: 'SikshyaSchoolData-dev'
  }

  if (conditional) {
    params.ConditionExpression = conditional
  }

  if (operator) {
    params.ConditionalOperator = operator
  }

  return dynamodb.deleteItem(params).promise()
}

/**
 * This method wraps around the dybamo query method.
 * @param {*}
 * @argument {String} condition The KeyConditionExpression that defines different filter operations to apply based on PK and SK
 * @argument {Object} attributes Map of placeholders to values. Placeholders  used in condition will be substitued using this map.
 * @argument {String} projection Comma seperated list of db attributes to fetch in the query
 */
const query = async ({ attributes, condition, projection }) => {
  const params = {
    KeyConditionExpression: condition,
    TableName: TABLE_NAMES.SIKSHYA_TABLE
  }

  if (attributes) {
    params.ExpressionAttributeValues = attributes
  }

  if (projection) {
    params.ProjectionExpression = projection
  }

  try {
    const data = await dynamodb.query(params).promise()
    return data
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * This function executes query command on dynamo db for exact match of PK
 * and begins_with match of SK
 * @param {String} pk PK of table
 * @param {String} sk Prefix of SK
 */
const queryByPKEqualsAndSKBeginsWith = async (pk, sk) => {
  const condition = 'PK = :pk  and begins_with ( SK, :sk )'
  const attributes = {
    ':sk': {
      S: sk
    },
    ':pk': {
      S: pk
    }
  }
  const data = await query({ attributes, condition })
  return data
}

module.exports = { SK_COMBINER, queryByPKEqualsAndSKBeginsWith, putItem, deleteItem }
