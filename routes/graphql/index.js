// ref. http://graphql.org/graphql-js/running-an-express-graphql-server/
const express = require('express')
const router = express.Router()
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const knex = require(`${global.__base}/lib/knex`)

const schema = buildSchema(`
  type Query {
    hello: String,
    memos(limit: Int): [Memo],
    memo(id: Int!): Memo
  }

  type Memo {
    id: Int,
    title: String,
    content: String,
    created_at: String,
    updated_at: String
  }
`)

const mapMemoFunc = function (row = {}) {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    created_at: row.created_at ? (new Date(row.created_at)).toISOString() : null,
    updated_at: row.updated_at ? (new Date(row.created_at)).toISOString() : null
  }
}

const root = {
  hello: () => {
    return 'Hello, GraphQL!'
  },
  memos: (args, request) => {
    const {limit = 3} = args
    return knex.select('*').from('memos').limit(limit).then(rows => {
      return rows.map(mapMemoFunc)
    })
  },
  memo: ({ id }) => {
    return knex.select('*').from('memos').where('id', id).then(rows => {
      return rows.map(mapMemoFunc)[0]
    })
  }
}

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

module.exports = router
