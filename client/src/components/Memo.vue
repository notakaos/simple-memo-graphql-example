<template>
  <div class="memo-item">
    <div>{{ memo.id }}: {{ memo.title }}</div>
    <hr />
    <textarea class="textarea" v-model="memo.content"></textarea>
  </div>
</template>

<script>
export default {
  name: 'Memo',
  props: {
    'memo': Object
  }
}
</script>
