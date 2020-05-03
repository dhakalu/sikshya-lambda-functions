
const { getUser, createNewUser, addUserToGroup, loginUser, forgotPassword } = require('../service/UserService')
const { saveSchedule } = require('../service/ClassSchedulingService')

const resolvers = {
  Query: {
    getUserInfo: (root, args) => getUser(args)
  },
  Mutation: {
    createNewUser: (root, args) => createNewUser(args.user),
    assignUserToGroup: (root, args) => addUserToGroup(args.request),
    login: (root, args) => loginUser(args.request),
    forgotPassword: (root, args) => forgotPassword(args.request),
    saveSchedule: (root, args) => saveSchedule(args.request)
  }
}

module.exports = { resolvers }
