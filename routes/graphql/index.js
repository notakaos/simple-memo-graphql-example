// ref. http://graphql.org/graphql-js/running-an-express-graphql-server/
const express = require('express')
const router = express.Router()
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const knex = require(`${global.__base}/lib/knex`)
const _ = require('lodash')

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
    updateMemo(id: Int!, title: String!, content: String!): Memo
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

const Memos = {
  find ({limit = 3, id, orderBy = 'id', orderDir = 'asc'}) {
    let q = knex.select('*').from('memos').limit(limit).orderBy(orderBy, orderDir)
    if (id) {
      q = q.where({ id })
    }
    return q.then(rows => {
      return rows.map(mapMemoFunc)
    })
  },
  findOneById ({ id }) {
    return Memos.find({ id, limit: 1 }).then(res => res[0])
  }
}

const queries = {
  hello: () => {
    return 'Hello, GraphQL!'
  },
  memos: (args) => Memos.find(args),
  memo: (args) => Memos.findOneById({ id: args.id })
}

const mutations = {
  addMemo: (args) => {
    return knex('memos').insert(args).returning('id').then(rows => {
      const id = rows[0]
      return id ? Memos.findOneById({ id }) : null
    })
  },
  updateMemo: ({id, title, content}) => {
    return knex('memos')
      .where({ id })
      .update({ title, content })
      .returning('id')
      .then(rows => {
        const id = rows[0]
        return id ? Memos.findOneById({ id }) : null
      })
  }
}

const root = _.merge(queries, mutations)

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

module.exports = router
