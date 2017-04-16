// ref. http://graphql.org/graphql-js/running-an-express-graphql-server/
const express = require('express')
const router = express.Router()
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const _ = require('lodash')
const Memos = require(`${global.__base}/models/Memos`)

const schema = buildSchema(`
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
`)

const queries = {
  hello: () => 'Hello, GraphQL!',
  memos: Memos.find,
  memo: Memos.findOneById
}

const mutations = {
  addMemo: Memos.addMemo,
  updateMemo: Memos.updateMemo,
  deleteMemo: Memos.deleteMemo
}

const root = _.merge(queries, mutations)

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

module.exports = router
