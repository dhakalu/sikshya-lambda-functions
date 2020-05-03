/* eslint-env jest */

const { createNewInsitiution, getInstutionDetails, getInstutionsByDistrict } = require('../../js/service/InstitutionService')
const { getDyanamoDBInstitutionFromJson } = require('../../js/utils/InstitutionUtils')
const { SK_COMBINER } = require('../../js/utils/DynamoDbUtils')

const { DocumentClient } = require('aws-sdk/clients/dynamodb')

const isTest = process.env.JEST_WORKER_ID
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env'
  })
}

const ddb = new DocumentClient(config)

// beforeEach(() => {
//   initializeCityDatabase()
// })

// afterEach(() => {
//   clearCityDatabase()
// })

const testRequest = {
  schoolId: '22c46735-90ec-4019-8ceb-5849f2b9b67f',
  name: 'Test International School',
  schoolType: 'PLUS_TWO',
  estabilishedAt: '2012',
  address: {
    address1: 'Basantanagar -16, Balaju',
    district: 'Kathmandu',
    state: 'Bagmati',
    postalCode: '123456'
  }
}

describe('Tests different actions that can be done on institution', () => {

  test('Gets proper dynamo databse object', () => {
    const item = getDyanamoDBInstitutionFromJson(testRequest)
    expect(item).not.toBe(null)
    const PK = item.PK
    expect(PK).not.toBe(null)
    const schoolId = PK.S
    expect(schoolId).not.toBe(null)
    expect(item).toEqual(
      {
        PK: {
          S: schoolId
        },
        SK: {
          S: ['INS', testRequest.address.district, testRequest.schoolType].join(SK_COMBINER)
        },
        name: {
          S: testRequest.name
        },
        schoolType: {
          S: testRequest.schoolType
        },
        estabilishedAt: {
          S: testRequest.estabilishedAt
        },
        address: {
          M: {
            address1: { S: testRequest.address.address1 },
            district: { S: testRequest.address.district },
            state: { S: testRequest.address.state },
            postalCode: { S: testRequest.address.postalCode }
          }
        }
      }
    )
  })

  // test('Creates a new institution entry into dynamo table', async () => {
  //   const data = await createNewInsitiution(testRequest)
  //   expect(data).toEqual(
  //     expect.objectContaining(testRequest)
  //   )
  // })

  test('Queries details of a specific institution, given its institutionId', async () => {
    const data = await getInstutionDetails(testRequest.schoolId)
    console.log(data)
  })

  test('Queries for a list of schools which belong to a district', async () => {
    const data = await getInstutionsByDistrict(testRequest.district)
    expect(data).toBe('todo')
  })
})
