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

    input UserLoginRequest {
        username: String!
        password: String!
    }

    type UserLoginResponse {
        accessToken: String!
        expiresIn: String!
        tokenType: String!
    }

    type UserGroupAssignResponse {
        username: String!
        groupName: String!
    }

    input ForgetPasswordRequest {
        username: String!
    }

    type Query {
        getUserInfo(username: String!): User!
    }

    type Mutation {
        createNewUser(user: UserSignUpRequest): User!
        assignUserToGroup(request: UserGroupAssignRequest): UserGroupAssignResponse!
        login(request: UserLoginRequest): UserLoginResponse!
        forgetPassword: String!
    }
`

module.exports = { typeDefs }
