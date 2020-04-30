const { ApolloServer } = require('apollo-server-lambda');
const { resolvers } = require('../resolver/resolvers')
const { typeDefs } = require('../schema/schema')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

exports.graphqlHandler = server.createHandler()
