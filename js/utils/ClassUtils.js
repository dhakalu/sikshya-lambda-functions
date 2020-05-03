
const { SK_COMBINER } = require('../utils/DynamoDbUtils')

const getDynamoDBClassFromJson = (institutionJson) => {
  const {
    schoolId,
    startTime,
    endTime,
    classType,
    days,
    subject,
    teachers,
    totalCapacity,
    currentlyEnrolled
  } = institutionJson

  // TODO validate the data
  return {
    PK: {
      S: schoolId
    },
    SK: {
      S: `CL${SK_COMBINER}${schoolId}${SK_COMBINER}${classType}${SK_COMBINER}${startTime}${SK_COMBINER}${endTime}`
    },
    startTime: {
      S: startTime
    },
    endTime: {
      S: endTime
    },
    classType: {
      S: classType
    },
    days: {
      SS: days
    },
    subject: {
      S: subject
    },
    teachers: {
      SS: teachers
    },
    totalCapacity: {
      S: totalCapacity
    },
    currentlyEnrolled: {
      S: currentlyEnrolled
    }
  }
}

module.exports = { getDynamoDBClassFromJson }
