exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('memos').del()
    .then(() => {
      // Inserts seed entries
      return knex('memos').insert([
        {id: 1, title: 'Memo1', content: 'This is example 1'},
        {id: 2, title: 'Memo2', content: 'This is example 2'},
        {id: 3, title: 'Memo3', content: 'This is example 3'},
        {id: 4, title: 'Memo4', content: 'This is example 4'},
        {id: 5, title: 'Memo5', content: 'This is example 5'}
      ])
    })
}
