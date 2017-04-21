exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('memos').del()
    .then(() => {
      // Inserts seed entries
      return knex('memos').insert([
        {title: 'Memo1', content: 'This is example 1'},
        {title: 'Memo2', content: 'This is example 2'},
        {title: 'Memo3', content: 'This is example 3'},
        {title: 'Memo4', content: 'This is example 4'},
        {title: 'Memo5', content: 'This is example 5'}
      ])
    })
}
