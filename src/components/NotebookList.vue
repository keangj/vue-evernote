<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="##" class="btn" @click.stop.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link :to="`/note?notebookId=${item.id}`" class="notebook" v-for="item in notebooks" :key="item.id">
            <div>
              <span class="iconfont icon-notebook"></span>
              <span class="note-title">{{item.title}}</span>
              <span>{{item.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(item)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(item)">删除</span>
              <span class="date">{{item.clearlyCreatedAt}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'
import { clearlyDate } from '@/helpers/util'
import { mapActions, mapGetters} from 'vuex'

  export default {
    name: 'NotebookList',
    data() {
      return {}
    },
    created() {
      Auth.getInfo().then(data => {
        if (!data.isLogin) {
          this.$router.push({ path: '/login' })
        } else {
          this.$store.dispatch('getNotebooks')
          // Notebooks.getNotebooks().then(res => {
          //   this.notebooks = res.data
          // })
        }
      })
    },
    computed: {
      ...mapGetters(['notebooks'])
    },
    methods: {
      ...mapActions(['getNotebooks','addNotebook','updateNotebook','deleteNotebook']),
      onCreate() {
        this.$prompt('请输入笔记本标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '标题不能为空，且不超过30个字符'
        }).then(({ value }) => {
          this.addNotebook({ title: value })
          // return Notebooks.addNotebook({title: value})
        })
        // .then(res => {
        //   res.data.clearlyCreatedAt = clearlyDate(res.data.createdAt)
        //   this.notebooks.unshift(res.data)
        //   this.$message({
        //     type: 'success',
        //     message: res.msg
        //   });
        // });
      },
      onEdit(item) {
        let title = ''
        this.$prompt('请输入新的笔记本标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: item.title,
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '标题不能为空，且不超过30个字符'
        }).then(({ value }) => {
          this.updateNotebook({ notebookId: item.id,title: value })
          // title = value
          // return Notebooks.updateNotebook(item.id, {title: value})
        })
        // .then(res => {
        //   item.title = title
        //   this.$message({
        //     type: 'success',
        //     message: res.msg
        //   });
        // });
      },
      onDelete(item) {
        this.$confirm('此操作将永久删除该笔记本, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteNotebook({ notebookId: item.id })
          // return Notebooks.deleteNotebook(item.id)
        })
        // .then(res => {
        //   this.notebooks.splice(this.notebooks.indexOf(item),1)
        //   this.$message({
        //     type: 'success',
        //     message: res.msg
        //   });
        // });
      }
    }
  }
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
