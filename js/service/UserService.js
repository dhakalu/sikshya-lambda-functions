
const AWS = require('aws-sdk')

const { convertUserRequestToCongintoRequest, getCognitoUserResponseToSchemaUser, convertAuthenticationResultToLoginResponse } = require('../utils/UserUtils')

const userPoolId = process.env.USER_POOL_ID
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })

const attachUserPoolIdToParams = (params) => ({
  ...params,
  UserPoolId: userPoolId
})

/**
 * This function can be used when we need to add a new user to our coginito pool
 * @param {*} createNewUserRequest Request for new user. Must contain data as defined in input UserSignUpRequest
 */
const createNewUser = (createNewUserRequest) => {
  const params = attachUserPoolIdToParams(convertUserRequestToCongintoRequest(createNewUserRequest))
  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.adminCreateUser(params).promise()
      .then(data => {
        console.log(data.User)
        resolve(getCognitoUserResponseToSchemaUser(data.User, 'Attributes'))
      }).catch(err => reject(err))
  })
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

const loginUser = ({ username, password }) => {
  const params = {
    AuthFlow: process.env.AUTH_FLOW,
    ClientId: process.env.CLIENT_ID,
    UserPoolId: process.env.USER_POOL_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password
    }
  }

  console.log(params)

  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.adminInitiateAuth(params).promise().then(data => {
      resolve(convertAuthenticationResultToLoginResponse(data.AuthenticationResult))
    }).catch(reject)
  })
}

const forgetPassword = ({ username }) => {
  const params = {
    Username: username,
    ClientId: process.env.CLIENT_ID
  }

  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.forgotPassword(params).promise()
      .then(data => resolve('Password reset link set to your email. Please check your email.'))
      .catch(reject)
  })
}

module.exports = { createNewUser, getUser, addUserToGroup, loginUser, forgetPassword }
