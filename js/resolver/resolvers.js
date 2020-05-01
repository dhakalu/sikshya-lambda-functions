
const { getUser, createNewUser, addUserToGroup, loginUser, forgetPassword } = require('../service/UserService')

const resolvers = {
  Query: {
    getUserInfo: (root, args) => getUser(args)
  },
  Mutation: {
    createNewUser: (root, args) => createNewUser(args.user),
    assignUserToGroup: (root, args) => addUserToGroup(args.request),
    login: (root, args) => loginUser(args.request),
    forgetPassword: (root, args) => forgetPassword(args.request)
  }
}

module.exports = { resolvers }
