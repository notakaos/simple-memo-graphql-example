// ref. http://graphql.org/graphql-js/running-an-express-graphql-server/
const express = require('express')
const router = express.Router()
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const knex = require(`${global.__base}/lib/knex`)

const schema = buildSchema(`
  type Query {
    hello: String,
    memos: [Memo]
  }

  type Memo {
    id: Int,
    title: String,
    content: String,
    created_at: String,
    updated_at: String
  }
`)

const root = {
  hello: () => {
    return 'Hello, GraphQL!'
  },
  memos: (args, request) => {
    return knex.select('*').from('memos').then(rows => {
      return rows.map((row) => {
        return {
          id: row.id,
          title: row.title,
          content: row.content,
          created_at: row.created_at ? (new Date(row.created_at)).toISOString() : null,
          updated_at: row.updated_at ? (new Date(row.created_at)).toISOString() : null
        }
      })
    })
  }
}

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

module.exports = router
