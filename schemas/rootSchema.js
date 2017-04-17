const rootSchema = `
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
`

module.exports = rootSchema
