
const getUserFullName = (firstName, lastName, middleName) => {
  const fullName = `${lastName || ''}${firstName ? ',' : ''} ${firstName || ''} ${middleName || ''}`
  console.log('Name to be used is ' + fullName)
  return fullName
}

const EMAIL = 'email'
const FIRST_NAME = 'given_name'
const LAST_NAME = 'family_name'
const MIDDLE_NAME = 'middle_name'
const NAME = 'name'

const validateCreateNewUserRequest = ({
  username,
  email,
  firstName,
  lastName,
  middleName
}) => {
  let errors = {}
  if (!username) {
    errors = {
      ...errors,
      username: 'Username is required'
    }
  }

  if (!email) {
    errors = {
      ...errors,
      email: 'Email is required'
    }
  }

  if (!firstName) {
    errors = {
      ...errors,
      firstName: 'First name is required'
    }
  }

  if (!lastName) {
    errors = {
      ...errors,
      lastName: 'Last name is required'
    }
  }

  return errors
}

/**
 * Converts the regular user JSON sent from/to UI to cognito request params.
 * @param {*} param
 */
const convertUserRequestToCongintoRequest = ({
  username,
  email,
  firstName,
  lastName,
  middleName = '-'
}) => {
  const name = getUserFullName(firstName, lastName, middleName)

  return {
    Username: username,
    UserAttributes: [
      {
        Name: EMAIL,
        Value: email
      },
      {
        Name: LAST_NAME,
        Value: lastName
      },
      {
        Name: FIRST_NAME,
        Value: firstName
      },
      {
        Name: MIDDLE_NAME,
        Value: middleName
      },
      {
        Name: NAME,
        Value: name
      }

    ]
  }
}

const getCognitoUserResponseToSchemaUser = (cogintoUserResponse, attributesKey = 'UserAttributes') => {
  const user = {}
  user.username = cogintoUserResponse.Username
  const UserAttributes = cogintoUserResponse[attributesKey]
  UserAttributes.forEach(element => {
    const fieldName = element.Name
    const fieldValue = element.Value
    switch (fieldName) {
      case EMAIL:
        user.email = fieldValue
        break
      case LAST_NAME:
        user.lastName = fieldValue
        break
      case FIRST_NAME:
        user.firstName = fieldValue
        break
      case MIDDLE_NAME:
        user.middleName = fieldValue
        break
      case NAME:
        user.name = fieldValue
        break
      default:
        user[fieldName] = fieldValue
    }
  })
  return user
}

const convertAuthenticationResultToLoginResponse = (authenticationResult) => {
  return {
    accessToken: authenticationResult.AccessToken || 'No Token Found',
    expiresIn: authenticationResult.ExpiresIn || new Date(),
    tokenType: authenticationResult.TokenType || 'none',
    idToken: authenticationResult.IdToken || 'Cannot find id token for this person'
  }
}

module.exports = {
  validateCreateNewUserRequest,
  convertUserRequestToCongintoRequest,
  getCognitoUserResponseToSchemaUser,
  convertAuthenticationResultToLoginResponse
}
