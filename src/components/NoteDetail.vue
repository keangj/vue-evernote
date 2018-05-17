<template>
  <div id="detail">
    <NoteSidebar/>
    <div id="note-detail">
      <h1>note : {{ $route.query.noteId }}book{{ $route.query.notebookId }}</h1>
    </div>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import NoteSidebar from '@/components/NoteSidebar'

  export default {
    name: 'NoteDetail',
    data() {
      return {
        msg: '笔记详情页'
      }
    },
    components: {
      NoteSidebar
    },
    created() {
      Auth.getInfo().then(data => {
        if (!data.isLogin) {
          this.$router.push({ path: '/login' })
        }
      })
    }
  }
</script>

<style scoped>
#detail {
  display: flex;
}
#note-detail {
  flex: 1;
}
h1 {
  color: blue;
}
</style>
