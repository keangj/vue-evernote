<template>
  <div id="note" class="detail">
    <NoteSidebar @updata-notes="getNotes"/>
    <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
    <div class="note-detail" v-show="curNote.id">
      <div class="note-bar">
        <span>创建时间:{{curNote.clearlyCreatedAt}}</span>
        <span>更新时间:{{curNote.clearlyUpdatedAt}}</span>
        <span>{{statusText}}</span>
        <span class="iconfont icon-delete" @click="deleteNote"></span>
        <span class="iconfont icon-fullscreen" @click="preview = !preview"></span>
      </div>
      <div class="note-title">
        <input type="text" v-model="curNote.title" @input="updataNote"
        @keydown="statusText = '正在输入...'" placeholder="输入标题">
      </div>
      <div class="editor">
        <textarea v-show="!preview" v-model="curNote.content" @input="updataNote"
        @keydown="statusText = '正在输入...'" placeholder="输入内容，支持markdown语法"></textarea>
        <div class="preview markdown-body" v-html="previewContent" v-show="preview"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import Notes from '@/apis/notes.js'
import NoteSidebar from '@/components/NoteSidebar'
// import Bus from '@/helpers/bus'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'

let md = new MarkdownIt({});

  export default {
    name: 'NoteDetail',

    data() {
      return {
        curNote: {},
        notes: [],
        statusText: '笔记未改动',
        preview: false
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
      // Bus.$once('updata-notes', val => {
      //   this.curNote = val.find(note => note.id == this.$route.query.noteId) || {}
      // })
    },

    methods: {
      getNotes(notes) {
        this.notes = notes
        this.curNote = this.notes.find(note => note.id == this.$route.query.noteId) || {}
      },
      deleteNote() {
        Notes.deleteNote({ noteId: this.curNote.id }).then(res => {
          this.$message.success(res.msg)
          this.notes.splice(this.notes.indexOf(this.curNote), 1)
          this.$router.replace({ path: '/note' })
        })
      },
      updataNote: _.debounce(function() {
          console.log(this.curNote)
          Notes.updateNote({ noteId: this.curNote.id },
            { title: this.curNote.title, content: this.curNote.content}).then(res => {
              this.statusText = '已保存'
            }).catch(err => {
              this.statusText = '保存出错'
            })
        }, 1000)
    },

    beforeRouteUpdate(to, from, next) {
      if (to.query.noteId) {
      this.curNote = this.notes.find(note => note.id == to.query.noteId)
      }
      next()
    },

    computed: {
      previewContent() {
        if (this.curNote.content) {
          return md.render(this.curNote.content);
        }
      }
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
