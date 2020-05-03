
const { getDynamoDbAssignmentFromJson } = require('../utils/AssignmentsUtils')
const { SK_COMBINER, putItem, queryByPKEqualsAndSKBeginsWith } = require('../utils/DynamoDbUtils')

/**
 * This function can be called when we need to insert a new
 * assignment into a scheduled class
 * @param {*} newAssignmentRequest Valid request that adds a new assignment to the given class of give school
 */
const createNewAssignment = async (newAssignmentRequest) => {
  const item = getDynamoDbAssignmentFromJson(newAssignmentRequest)
  await putItem(item)
  return {
    assignmentId: item.assignmentId.S,
    ...newAssignmentRequest
  }
}

/**
 * Fetches all the assignmensts for a class level of a school. For example,
 * get me all the assignments of Class 1 of School Xavier International Collgege
 * @param {String} schoolId Unique identifier that identifies a school
 * @param {String} classLevel The level of which assignments we need to return
 */
const getAllAssignmentsForAClassLevelOfASchool = (schoolId, classLevel) => {
  const sk = `AS${SK_COMBINER}${schoolId}${SK_COMBINER}${classLevel}${SK_COMBINER}`
  return queryByPKEqualsAndSKBeginsWith(schoolId, sk)
}
/**
 *
 * @param {String} schoolId Unique identifier of a school
 * @param {String} classLevel The level of class for which the assignments belong to
 * @param {String} classId Uniqueue idenifier that identifies a class //TODO discuss if subject can be used instead
 */
const getAllAssignmentOfASubjectOfAclassLevelOfASchool = (schoolId, classLevel, classId) => {
  const sk = `AS${SK_COMBINER}${schoolId}${SK_COMBINER}${classLevel}${SK_COMBINER}${classId}`
  return queryByPKEqualsAndSKBeginsWith(schoolId, sk)
}

module.exports = {
  createNewAssignment,
  getAllAssignmentsForAClassLevelOfASchool,
  getAllAssignmentOfASubjectOfAclassLevelOfASchool
}
