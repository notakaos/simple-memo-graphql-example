<template>
  <div class="memo-item">
    <div>{{ memo.id }}: {{ memo.title }}</div>
    <a href="#" @click="deleteMemo" class="remove-button">
       &times;
    </a>
    <hr />
    <textarea class="textarea" v-model="memo.content"></textarea>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Memo',
  props: {
    'memo': Object
  },
  methods: {
    deleteMemo () {
      this.$apollo.mutate({
        mutation: gql`mutation ($id: Int!) {
          deleteMemo (id: $id)
        }`,
        variables: {
          id: this.memo.id
        }
      })
      .then((data) => {
        console.log(data)
        console.log('deleted!')
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
