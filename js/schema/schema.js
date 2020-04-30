const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
    type User {
        username: String!
        firstName: String
        lastName: String
        middleName: String
        name: String
        email: String!
        password: String
        groupName: String
    }

    input UserSignUpRequest {
        username: String!
        firstName: String!
        lastName: String!
        middleName: String
        email: String!
    }

    input UserGroupAssignRequest {
        username: String!
        groupName: String!
    }

    type UserGroupAssignResponse {
        username: String!
        groupName: String!
    }

    type Query {
        getUserInfo(username: String!): User!
    }

    type Mutation {
        createNewUser(user: UserSignUpRequest): User!
        assignUserToGroup(request: UserGroupAssignRequest): UserGroupAssignResponse!
    }
`

module.exports = { typeDefs }
