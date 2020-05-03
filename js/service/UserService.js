
const AWS = require('aws-sdk')
const { ValidationError } = require('../utils/errors/ValidationError')

const {
  validateCreateNewUserRequest,
  convertUserRequestToCongintoRequest,
  getCognitoUserResponseToSchemaUser,
  convertAuthenticationResultToLoginResponse
} = require('../utils/UserUtils')

const userPoolId = process.env.USER_POOL_ID
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })

const attachUserPoolIdToParams = (params) => ({
  ...params,
  UserPoolId: userPoolId
})

const NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED'

/**
 * This function can be used when we need to add a new user to our coginito pool
 * @param {*} createNewUserRequest Request for new user. Must contain data as defined in input UserSignUpRequest
 */
const createNewUser = async (createNewUserRequest) => {
  const errors = validateCreateNewUserRequest(createNewUserRequest)
  if (Object.keys(errors).length) throw new ValidationError(errors)
  const params = attachUserPoolIdToParams(convertUserRequestToCongintoRequest(createNewUserRequest))
  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.adminCreateUser(params).promise()
      .then(data => {
        console.log(data.User)
        resolve(getCognitoUserResponseToSchemaUser(data.User, 'Attributes'))
      }).catch(err => reject(err))
  })
}

const disableUser = ({ username }, disabledBy) => {
  /* TODO check the access based on diabledBy. If disabledBy does not have access throw error.
  * For now this function is not used hence we are throwing error
  *
  */
}

/**
 * This method returns the details of a user. The user is identfied by the username
 * @param {Object}
 */
const getUser = ({ username }) => {
  const params = attachUserPoolIdToParams({ Username: username })
  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.adminGetUser(params).promise()
      .then(data => {
        resolve(getCognitoUserResponseToSchemaUser(data))
      }).catch(err => reject(err))
  })
}

const addUserToGroup = ({ username, groupName }) => {
  const params = attachUserPoolIdToParams({ Username: username, GroupName: groupName })
  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.adminAddUserToGroup(params).promise()
      .then(data => {
        resolve({
          groupName: groupName,
          username: username
        })
      }).catch(reject)
  })
}

const loginUser = ({ username, password, newPassword }) => {
  const params = {
    AuthFlow: process.env.AUTH_FLOW,
    ClientId: process.env.CLIENT_ID,
    UserPoolId: process.env.USER_POOL_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password
    }
  }

  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.adminInitiateAuth(params).promise().then(data => {
      const ChallengeName = data.ChallengeName
      switch (ChallengeName) {
        case NEW_PASSWORD_REQUIRED: {
          const challangeParams = {
            ChallengeName: ChallengeName,
            ClientId: process.env.CLIENT_ID,
            ChallengeResponses: {
              NEW_PASSWORD: newPassword,
              USERNAME: username
            },
            Session: data.Session
          }
          cognitoidentityserviceprovider.respondToAuthChallenge(challangeParams).promise()
            .then(data => {
              resolve(resolve(convertAuthenticationResultToLoginResponse(data.AuthenticationResult)))
            }).catch(reject)
          break
        }
        default:
          resolve(convertAuthenticationResultToLoginResponse(data.AuthenticationResult))
      }
    }).catch(reject)
  })
}

const forgotPassword = ({ username }) => {
  const params = {
    Username: username,
    ClientId: process.env.CLIENT_ID
  }

  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.forgotPassword(params).promise()
      .then(data => {
        const { DeliveryMedium, Destination } = data.CodeDeliveryDetails
        resolve(`Password verification has been sent via ${DeliveryMedium} to ${Destination}`)
      }).catch(reject)
  })
}

module.exports = { createNewUser, getUser, addUserToGroup, loginUser, forgotPassword }
