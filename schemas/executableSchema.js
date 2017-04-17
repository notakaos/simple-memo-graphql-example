const { makeExecutableSchema } = require('graphql-tools')
const Memos = require(`${global.__base}/models/Memos`)
const typeDef = require(`./rootSchema`)
const typeDefs = [typeDef]

const resolvers = {
  Query: {
    hello: () => 'Hello, Apollo World!',
    memos: (obj, args, context, info) => Memos.find(args),
    memo: (obj, args, context, info) => Memos.findOneById(args)
  },
  Mutation: {
    addMemo: (obj, args, context, info) => Memos.addMemo(args),
    updateMemo: (obj, args, context, info) => Memos.updateMemo(args),
    deleteMemo: (obj, args, context, info) => Memos.deleteMemo(args)
  }
}

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = executableSchema
