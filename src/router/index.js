import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NotebookList from '@/components/NotebookList'
import NoteDetail from '@/components/NoteDetail'
import TrashDetail from '@/components/TrashDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/notebooks',
      // name: 'NotebookList',
      component: NotebookList
    },
    {
      path: '/note/:noteId',
      // name: 'NoteDetail',
      component: NoteDetail
    },
    {
      path: '/trash/:noteId',
      // name: 'TrashDetail',
      component: TrashDetail
    }
  ]
})
