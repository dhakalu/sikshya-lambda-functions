'use strict'

const { createNewUser } = require('./js/service/UserService')

const newUserRequest = {
  username: 'admin2',
  firstName: 'Sikshya',
  lastName: 'Admin 2',
  email: 'udhakal0511@gmail.com'
}

module.exports.hello = async (event, context) => {
  let data
  try {
    data = await createNewUser(newUserRequest)
  } catch (err) {
    console.log(err, err.stack)
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data, null, 2)
  }
}
