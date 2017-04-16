// updated_at 自動更新
// ref. http://www.revsys.com/blog/2006/aug/04/automatically-updating-a-timestamp-column-in-postgresql/

const tableName = 'memos'
const triggerName = 'trigger_auto_update_updated_at_column'
const defineTriggerSQL = `
  CREATE TRIGGER ${triggerName}
  BEFORE UPDATE ON ${tableName}
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
`

const dropTriggerSQL = `
  DROP TRIGGER ${triggerName} ON ${tableName};
`

exports.up = function (knex, Promise) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('id')
    t.string('title')
    t.string('content')
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
  .then(() => console.log(`[INFO] create ${tableName} table`))
  .then(() => knex.raw(defineTriggerSQL))
  .then(() => console.log(`[INFO] defined ${triggerName} trigger`))
  .catch((err) => {
    throw err
  })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
  .then(() => knex.raw(dropTriggerSQL))
  .then(() => console.log(`[INFO] dropped ${triggerName} trigger`))
  .then(() => knex.schema.dropTable(tableName))
  .then(() => console.log(`[INFO] dropped ${tableName} table`))
  .catch((err) => {
    throw err
  })
}
