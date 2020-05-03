const { ApolloServer } = require('apollo-server-lambda')
const { resolvers } = require('../resolver/resolvers')
const { typeDefs } = require('../schema/schema')

const server = new ApolloServer({
  typeDefs,
  resolvers
  // formatError: error => ({
  //   message: error.message,
  //   state: error.originalError && error.originalError.state,
  //   locations: error.locations,
  //   path: error.path
  // })
})

exports.graphqlHandler = server.createHandler()
