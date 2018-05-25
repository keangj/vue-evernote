<template>
  <div id="note" class="detail">
    <NoteSidebar/>
    <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
    <div class="note-detail" v-show="curNote.id">
      <div class="note-bar">
        <span>创建时间:{{curNote.clearlyCreatedAt}}</span>
        <span>更新时间:{{curNote.clearlyUpdatedAt}}</span>
        <span>{{statusText}}</span>
        <span class="iconfont icon-delete" @click="onDeleteNote"></span>
        <span class="iconfont icon-fullscreen" @click="preview = !preview"></span>
      </div>
      <div class="note-title">
        <input type="text" v-model="curNote.title" @input="onUpdataNote"
        @keydown="statusText = '正在输入...'" placeholder="输入标题">
      </div>
      <div class="editor">
        <textarea v-show="!preview" v-model="curNote.content" @input="onUpdataNote"
        @keydown="statusText = '正在输入...'" placeholder="输入内容，支持markdown语法"></textarea>
        <div class="preview markdown-body" v-html="previewContent" v-show="preview"></div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import { mapGetters, mapMutations, mapActions } from 'vuex'


let md = new MarkdownIt({});

export default {
  name: 'NoteDetail',

  data() {
    return {
      statusText: '笔记未改动',
      preview: false
    }
  },

  components: {
    NoteSidebar
  },

  created() {
    this.checkLogin({ path: '/login' }).then(() => {
      this.getTrashNotes()
    })
  },
  computed: {
    ...mapGetters([
      'notes',
      'curNote'
    ]),
    previewContent() {
      if (this.curNote.content) {
        return md.render(this.curNote.content);
      }
    }
  },
  methods: {
    ...mapMutations(['setCurNoteId']),
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin',
      'getTrashNotes'
    ]),

    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id }).then(() => {
        this.$router.replace({ path: '/note' })
      })
    },
    onUpdataNote: _.debounce(function() {
      this.updateNote({ noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content })
      .then(() => {
          this.statusText = '已保存'
        }).catch(() => {
          this.statusText = '保存出错'
        })
      }, 1000)
  },

  beforeRouteUpdate(to, from, next) {
    if (to.query.noteId) {
      this.setCurNoteId({ curNoteId: to.query.noteId })
    }
    next()
  }
}
</script>

<style lang="less">
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  flex: 1;
  background-color: #fff;
  align-items: stretch;
}
</style>
