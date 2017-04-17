<template>
  <div>
    <h1>Memos</h1>
    <h2>{{ hello }}</h2>
    <ul>
      <li v-for="memo in memos">{{ memo.id }}: {{ memo.title }}</li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Memos',
  data () {
    return {
      memos: [
        {id: 1, title: 'memo 1'},
        {id: 2, title: 'memo 2'},
        {id: 3, title: 'memo 3'}
      ],
      hello: ''
    }
  },
  apollo: {
    hello: gql`{hello}`
  }
}
</script>
