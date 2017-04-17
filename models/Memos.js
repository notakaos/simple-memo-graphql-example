const knex = require(`${global.__base}/lib/knex`)
// const _ = require('lodash')

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
  },
  addMemo (args) {
    return knex('memos').insert(args).returning('id').then(rows => {
      const id = rows[0]
      return id ? Memos.findOneById({ id }) : null
    })
  },
  updateMemo ({ id, title, content }) {
    return knex('memos')
      .where({ id })
      .update({ title, content })
      .returning('id')
      .then(rows => {
        const id = rows[0]
        return id ? Memos.findOneById({ id }) : null
      })
  },
  deleteMemo ({ id }) {
    return knex('memos')
      .where({ id })
      .delete()
      .then(result => {
        return result > 0
      })
  }
}

module.exports = Memos
