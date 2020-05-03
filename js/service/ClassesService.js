
const { getDynamoDBClassFromJson } = require('../utils/ClassUtils')
const { SK_COMBINER, putItem, queryByPKEqualsAndSKBeginsWith } = require('../utils/DynamoDbUtils')

const addNewClass = async (newClassRequest) => {
  const item = getDynamoDBClassFromJson(newClassRequest)
  await putItem(item)
  return {
    ...newClassRequest
  }
}

const getAllClassesOfASchool = async ({ schoolId }) => {
  const sk = `CL${SK_COMBINER}${schoolId}`
  return queryByPKEqualsAndSKBeginsWith(schoolId, sk)
}

const getAllClassesOfASchoolForAClassType = async ({ schoolId, classType }) => {
  const sk = `CL${SK_COMBINER}${schoolId}${SK_COMBINER}${classType}`
  return queryByPKEqualsAndSKBeginsWith(schoolId, sk)
}

module.exports = {
  addNewClass,
  getAllClassesOfASchool,
  getAllClassesOfASchoolForAClassType
}
