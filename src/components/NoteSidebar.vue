<template>
  <div id="note-sidebar">
    <div class="wrap">
    <span v-show="!isShow" class="note-title">无笔记本</span>
    <el-dropdown v-show="isShow" class="note-title" @command="handleCommand">
      <span class="el-dropdown-link">
        {{curBook.title}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="dropdown-menu">
        <el-dropdown-item :command="notebook.id" v-for="notebook in notebooks" :key="notebook.id">{{notebook.title}}</el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
    <span class="btn add-note" v-show="isShow" @click="onAddNote">添加笔记</span>
    <div class="menu">
      <span>更新时间</span>
      <span>标题</span>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`" href="##" class="note">
          <span class="date">{{note.clearlyUpdatedAt}}</span>
          <span class="title">{{note.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  created() {
    this.getNotebooks().then(() => {
      this.setCurBookId({ curBookId: this.$route.query.notebookId })
      if (this.curBook.id) {
        return this.getNotes({ notebookId: this.curBook.id })
      } else {
        this.isShow = false
      }
    }).then(() => {
      this.setCurNoteId({ curNoteId: this.$route.query.noteId })
      this.$router.replace({
        path: '/note',
        query: {
          noteId: this.curNote.id,
          notebookId: this.curBook.id
        }
      })
    })
  },
  data() {
      return {
        isShow: true
      }
  },
  computed: {
    ...mapGetters([
      'notebooks',
      'notes',
      'curBook',
      'curNote'
      ])
  },
  methods: {
    ...mapMutations([
      'setCurBookId',
      'setCurNoteId'
    ]),
    ...mapActions([
      'getNotebooks',
      'getNotes',
      'addNote',
    ]),
    handleCommand(notebookId) {
      if (notebookId == 'trash') {
        return this.$router.push({ path: '/trash'})
      }
      this.setCurBookId({ curBookId: notebookId })
      this.getNotes({ notebookId }).then(() => {
      this.setCurNoteId()
      this.$router.replace({
        path: '/note',
        query: {
          noteId: this.curNote.id,
          notebookId: this.curBook.id
        }
      })
    })
    },

    onAddNote() {
      this.addNote({notebookId: this.curBook.id})
    }
  }
};
</script>

<style lang="less" scoped>
  @import url(../assets/css/note-sidebar.less);
</style>
