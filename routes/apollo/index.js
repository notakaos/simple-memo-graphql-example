const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const Memos = require(`${global.__base}/models/Memos`)
// const _ = require('lodash')

const typeDef = require(`${global.__base}/schemas/rootSchema`)
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

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

router.use('/graphiql', graphiqlExpress({
  endpointURL: '/apollo'
}))

router.use('/', bodyParser.json(), graphqlExpress({ schema }))

module.exports = router
