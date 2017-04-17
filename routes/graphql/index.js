// ref. http://graphql.org/graphql-js/running-an-express-graphql-server/
const express = require('express')
const router = express.Router()
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const { merge } = require('lodash')
const Memos = require(`${global.__base}/models/Memos`)

const schema = buildSchema(require(`${global.__base}/schemas/rootSchema`))

const queries = {
  hello: () => 'Hello, GraphQL!',
  memos: (args, context) => Memos.find(args),
  memo: (args, context) => Memos.findOneById(args)
}

const mutations = {
  addMemo: (args, context) => Memos.addMemo(args),
  updateMemo: (args, context) => Memos.updateMemo(args),
  deleteMemo: (args, context) => Memos.deleteMemo(args)
}

const rootValue = merge(queries, mutations)

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true
}))

module.exports = router
