// updated_at 自動更新
// ref. http://www.revsys.com/blog/2006/aug/04/automatically-updating-a-timestamp-column-in-postgresql/

const pgFuncName = 'update_updated_at_column'
const defineFuncSQL = `
  CREATE OR REPLACE FUNCTION ${pgFuncName}()
  RETURNS TRIGGER AS $$
  BEGIN
      NEW.updated_at = now();
      RETURN NEW;
  END;
  $$ language 'plpgsql';
`

const dropFuncSQL = `
  DROP FUNCTION ${pgFuncName}();
`

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.raw(defineFuncSQL).then(() => {
      console.log(`[INFO] defined ${pgFuncName} function`)
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.raw(dropFuncSQL).then(() => {
      console.log(`[INFO] dropped ${pgFuncName} function`)
    })
  ])
}
