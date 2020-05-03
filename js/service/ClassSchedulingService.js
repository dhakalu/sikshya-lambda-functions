const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB()

const saveSchedule = ({ classId, schoolId, period, subjectId, teachers }) => {
  const params = {
    Item: {
      schoolId: {
        S: schoolId
      },
      classId: {
        S: classId
      },
      period: {
        S: period
      },
      subjectId: {
        S: subjectId
      },
      teachers: {
        SS: teachers
      }
    },
    ReturnConsumedCapacity: 'TOTAL',
    TableName: 'SchoolClassSchedule'
  }

  return new Promise((resolve, reject) => {
    dynamodb.putItem(params).promise().then(data => {
      resolve('Saved Successuflly!')
    }).catch(reject)
  })
}

module.exports = { saveSchedule }
