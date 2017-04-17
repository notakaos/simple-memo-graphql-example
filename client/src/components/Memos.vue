<template>
  <div>
    <h1>Memos</h1>
    <ul>
      <li v-for="memo in memos">{{ memo.id }}: {{ memo.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Memos',
  data () {
    return {
      memos: [
        {id: 1, title: 'memo 1'},
        {id: 2, title: 'memo 2'},
        {id: 3, title: 'memo 3'}
      ]
    }
  }
}
</script>
