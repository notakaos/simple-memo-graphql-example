<template>
  <div class="memo-list">
    <memo v-for="memo in memos" :key="memo.id" :memo="memo"></Memo>
  </div>
</template>

<script>
import Memo from './Memo'
import gql from 'graphql-tag'

export default {
  name: 'Memos',
  components: {
    Memo
  },
  data () {
    return {
      memos: [],
      hello: ''
    }
  },
  apollo: {
    hello: gql`{hello}`,
    memos: {
      query: gql`{
        memos(orderBy: "created_at", orderDir: "desc" limit: 100) {
          id
          title
          content
          created_at
          updated_at
        }
      }`,
      pollInterval: 2000
    }
  }
}
</script>
