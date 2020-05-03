const { v4 } = require('uuid')
const { getDyanmoDBAddress } = require('./AddressUtils')
const { SK_COMBINER } = require('./DynamoDbUtils')

const getDyanamoDBInstitutionFromJson = (institutionJson) => {
  const { name, schoolType, address, estabilishedAt } = institutionJson

  if (!estabilishedAt || !name || !schoolType || !address.district) {
    throw Error('Invalid request')
  }

  return {
    PK: {
      S: v4()
    },
    SK: {
      S: ['INS', address.district, schoolType].join(SK_COMBINER)
    },
    name: {
      S: name
    },
    estabilishedAt: {
      S: estabilishedAt
    },
    schoolType: {
      S: schoolType
    },
    address: {
      M: getDyanmoDBAddress(address)
    }
  }
}

module.exports = { getDyanamoDBInstitutionFromJson }
