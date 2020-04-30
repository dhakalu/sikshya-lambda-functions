const AWS = require('aws-sdk')

const parameterStore = new AWS.SSM()

module.exports.getParam = param => {
  return new Promise((resolve, reject) => {
    parameterStore.getParameter({
      Name: param
    }, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}
