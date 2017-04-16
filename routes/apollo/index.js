const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const Memos = require(`${global.__base}/models/Memos`)
// const _ = require('lodash')

const typeDefs = [`
  type Memo {
    id: Int,
    title: String,
    content: String,
    created_at: String,
    updated_at: String
  }

  type Query {
    hello: String,
    memos(limit: Int, orderBy: String, orderDir: String): [Memo],
    memo(id: Int!): Memo
  }

  type Mutation {
    addMemo(title: String!, content: String!): Memo,
    updateMemo(id: Int!, title: String!, content: String!): Memo,
    deleteMemo(id: Int!): Boolean
  }
`]

const resolvers = {
  Query: {
    hello: () => 'Hello, Apollo World!',
    memos: (obj, args, context, info) => Memos.find(args),
    memo: (obj, args, context, info) => Memos.findOneById(args)
  },
  Mutation: {
    addMemo: (obj, args) => Memos.addMemo(args),
    updateMemo: (obj, args) => Memos.updateMemo(args),
    deleteMemo: (obj, args) => Memos.deleteMemo(args)
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
