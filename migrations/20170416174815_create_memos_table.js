
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('memos', (t) => {
      t.increments('id')
      t.string('title')
      t.string('content')
      t.timestamps()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('memos')
  ])
}
