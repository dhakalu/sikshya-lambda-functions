
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

module.exports = { convertUserRequestToCongintoRequest, getCognitoUserResponseToSchemaUser }
