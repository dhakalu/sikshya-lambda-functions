const { getDyanamoDBInstitutionFromJson } = require('../utils/InstitutionUtils')
const { putItem, queryByPKEqualsAndSKBeginsWith, SK_COMBINER } = require('../utils/DynamoDbUtils')

const createNewInsitiution = async (createNewInsitiutionRequest) => {
  const item = getDyanamoDBInstitutionFromJson(createNewInsitiutionRequest)
  await putItem(item)
  return {
    studentId: item.PK.S,
    ...createNewInsitiutionRequest
  }
}

const getInstutionDetails = async (institutionId) => {
  const sk = 'INS_'
  return queryByPKEqualsAndSKBeginsWith(institutionId, sk)
}

const getInstutionsByDistrict = async (district) => {
  /**
   * TO achieve this we will have to create a GSI based on district.
   * We will explore this later.
   */
  return 'todo'
}

const deleteInstitution = async (deleteInstitutionRequest) => {
  // TODO finish this
  return 'todo'
}

module.exports = { createNewInsitiution, getInstutionDetails, getInstutionsByDistrict }
