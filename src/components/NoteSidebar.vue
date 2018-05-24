<template>
  <div id="note-sidebar">
    <div class="wrap">
    <el-dropdown class="note-title" @command="handleCommand">
      <span class="el-dropdown-link">
        {{curBook.title}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="dropdown-menu">
        <el-dropdown-item :command="notebook.id" v-for="notebook in notebooks" :key="notebook.id">{{notebook.title}}</el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
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
import Notebooks from '@/apis/notebooks'
import Notes from '@/apis/notes'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  created() {
    this.getNotebooks().then(() => {
      this.setCurBookId({ curBookId: this.$route.query.notebookId })
      return this.getNotes({ notebookId: this.curBook.id })
    }).then(() => {
      this.setCurNoteId({ curNoteId: this.$route.query.noteId })
    })

    // Notebooks.getNotebooks().then(res => {
    //   this.notebooks = res.data
    //   this.curBook = this.notebooks.find(notebook => {
    //     return notebook.id == this.$route.query.notebookId
    //   }) || this.notebooks[0] || {}
    //   return Notes.getNotes({ notebookId: this.curBook.id })
    // }).then(res => {
    //   this.notes = res.data
    //   this.$emit('updata-notes', this.notes)
    // })
  },
  data() {
      return {}
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
      this.getNotes({ notebookId })
      this.setCurNoteId({ curNoteId: this.$route.query.noteId })
      // Notes.getNotes({ notebookId }).then(res => {
      //   this.notes = res.data
      //   this.$emit('updata-notes', this.notes)
      // })
      // this.curBook = this.notebooks.find(notebook => notebook.id ==notebookId)
    },

    onAddNote() {
      this.addNote({notebookId: this.curBook.id})

      // Notes.addNote({ notebookId: this.curBook.id }).then(res => {
      //   this.notes.unshift(res.data)
      // })
    }
  }
};
</script>

<style lang="less" scoped>
  @import url(../assets/css/note-sidebar.less);
</style>
