
const { getUser, createNewUser, addUserToGroup } = require('../service/UserService')

const resolvers = {
  Query: {
    getUserInfo: (root, args) => getUser(args)
  },
  Mutation: {
    createNewUser: (root, args) => createNewUser(args.user),
    assignUserToGroup: (root, args) => addUserToGroup(args.request)
  }
}

module.exports = { resolvers }
