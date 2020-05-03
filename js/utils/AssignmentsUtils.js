const { v4 } = require('uuid')
const { SK_COMBINER } = require('../utils/DynamoDbUtils')

const getDynamoDbAssignmentFromJson = (newAssignmentRequest) => {
  const {
    schoolId,
    classId,
    classLevel,
    assignmentName,
    createdAt,
    createdBy,
    dueOn,
    totalMarks
  } = newAssignmentRequest

  return {
    PK: {
      S: schoolId
    },
    SK: {
      S: `AS${SK_COMBINER}${schoolId}${SK_COMBINER}${classLevel}${SK_COMBINER}${classId}`
    },
    assignmentId: {
      S: v4()
    },
    classId: {
      S: classId
    },
    createdAt: {
      S: createdAt
    },
    assignmentName: {
      S: assignmentName
    },
    createdBy: {
      S: createdBy
    },
    dueOn: {
      S: dueOn
    },
    totalMarks: {
      N: totalMarks
    }
  }
}

module.exports = { getDynamoDbAssignmentFromJson }
