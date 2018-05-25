<template>
  <div id="trash" class="detail">
    <div class="trash-sidebar">
      <h3 class="note-title">回收站</h3>
      <div class="menu">
        <span>更新时间</span>
        <span>标题</span>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/trash?noteId=${note.id}`" href="##" class="note">
            <span class="date">{{note.clearlyUpdatedAt}}</span>
            <span class="title">{{note.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="trash-detail">
      <div class="note-bar" v-if="true">
        <span>创建时间:{{curTrashNote.clearlyCreatedAt}}</span>
        <span>更新时间:{{curTrashNote.clearlyUpdatedAt}}</span>
        <span>所属笔记本：{{belongTo}}</span>
        <span class="btn action" @click="onRevert">恢复</span>
        <span class="btn action" @click="onDelete">彻底删除</span>
      </div>
      <div class="note-title">
        <span>{{curTrashNote.title}}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Trash from '@/apis/trash'
import MarkdownIt from 'markdown-it'
import { mapGetters, mapMutations, mapActions } from 'vuex'

let md = new MarkdownIt({});

export default {
  name: 'TrashDetail',
  data() {
    return {}
  },

  computed: {
    ...mapGetters([
      'trashNotes',
      'curTrashNote',
      'belongTo'
    ]),
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || '')
    }
  },

  methods: {
    ...mapMutations(['setCurTrashNoteId']),
    ...mapActions([
      'getTrashNotes',
      'deleteTrashNote',
      'revertTrashNote',
      'checkLogin',
      'getNotebooks'
    ]),
    onDelete() {
      this.deleteTrashNote({ noteId: this.curTrashNote.id })
    },
    onRevert() {
      console.log(this.curTrashNote)
      this.revertTrashNote({ note: this.curTrashNote })
    }
  },

  beforeRouteUpdate(to, from, next) {
    if (to.query.noteId) {
      this.setCurTrashNoteId({ curTrashNoteId: to.query.noteId })
    }
    next()
  },

  created() {
    this.checkLogin({ path: '/login' }).then(() => {
      return this.getTrashNotes()
    }).then(() => {
      this.getNotebooks()
      this.setCurTrashNoteId({ curTrashNoteId: this.$route.query.noteId })
    })
  }
}
</script>

<style lang="less">
@import url(../assets/css/trash.less);

#trash {
  display: flex;
  flex: 1;
  background-color: #fff;
  align-items: stretch;
}
</style>
