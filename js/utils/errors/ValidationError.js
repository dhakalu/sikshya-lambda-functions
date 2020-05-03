const { GraphQLError } = require('graphql')

class ValidationError extends GraphQLError {
  constructor (errors) {
    super('The request is invalid.')
    this.state = errors
  }
}

module.exports = { ValidationError }
